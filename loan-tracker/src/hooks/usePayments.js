import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const usePayments = (loanId = null) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q;
    if (loanId) {
      q = query(collection(db, 'payments'), where('loanId', '==', loanId));
    } else {
      q = query(collection(db, 'payments'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const paymentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPayments(paymentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loanId]);

  const addPayment = async (paymentData) => {
    const paymentRef = await addDoc(collection(db, 'payments'), {
      ...paymentData,
      paymentDate: new Date().toISOString()
    });
    return { id: paymentRef.id, ...paymentData };
  };

  return { payments, loading, addPayment };
};