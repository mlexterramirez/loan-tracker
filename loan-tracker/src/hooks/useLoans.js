import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { calculateMonthlyPayment } from '../utils/loanCalculations';

export const useLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = collection(db, 'loans');
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const loansData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLoans(loansData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addLoan = async (loanData) => {
    try {
      const monthlyDue = calculateMonthlyPayment(
        loanData.totalPrice - (loanData.downpayment || 0),
        loanData.terms,
        loanData.monthlyInterestPct
      );

      const loanRef = await addDoc(collection(db, 'loans'), {
        ...loanData,
        monthlyDue,
        totalPaid: loanData.downpayment || 0,
        paymentProgress: `0 of ${loanData.terms} payments made`,
        status: 'active',
        createdAt: new Date().toISOString()
      });
      
      return { id: loanRef.id, ...loanData };
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateLoanStatus = async (loanId, status) => {
    try {
      await updateDoc(doc(db, 'loans', loanId), { status });
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { loans, loading, error, addLoan, updateLoanStatus };
};