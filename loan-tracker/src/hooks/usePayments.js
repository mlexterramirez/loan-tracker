import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, setDoc } from 'firebase/firestore';
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
    const paymentId = generateUUID();
    await setDoc(doc(db, 'payments', paymentId), {
      ...paymentData,
      paymentId,
      paymentDate: new Date().toISOString()
    });
  };

  return { payments, loading, addPayment };
};