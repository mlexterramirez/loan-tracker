import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { calculateMonthlyPayment } from '../utils/loanCalculations';

export const useLoans = (borrowerId = null) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q;
    if (borrowerId) {
      q = query(collection(db, 'loans'), where('borrowerId', '==', borrowerId));
    } else {
      q = query(collection(db, 'loans'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loansData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoans(loansData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [borrowerId]);

  const addLoan = async (loanData) => {
    const loanId = generateUUID();
    const monthlyDue = calculateMonthlyPayment(
      loanData.totalPrice - loanData.downpayment,
      loanData.terms,
      loanData.monthlyInterestPct
    );
    
    await setDoc(doc(db, 'loans', loanId), {
      ...loanData,
      loanId,
      monthlyDue,
      status: 'active',
      totalPaid: loanData.downpayment,
      paymentProgress: `0 of ${loanData.terms} payments made`
    });
  };

  return { loans, loading, addLoan };
};