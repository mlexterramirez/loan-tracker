// src/hooks/usePayments.js
import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc,
  serverTimestamp  // Add this import
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const usePayments = (userId) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    const q = query(collection(db, 'payments'), where('userId', '==', userId));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const paymentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPayments(paymentsData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  const addPayment = useCallback(async (paymentData) => {
    try {
      const paymentRef = collection(db, 'payments');
      await addDoc(paymentRef, {
        ...paymentData,
        userId,
        recordedAt: serverTimestamp()  // Now properly imported
      });
      return true;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [userId]);

  return { 
    payments, 
    loading, 
    error, 
    addPayment 
  };
};