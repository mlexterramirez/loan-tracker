// src/hooks/useLoans.js
import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { calculateLoanDetails } from '../utils/loanCalculations';

export const useLoans = (userId) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loans for specific user
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    const q = query(collection(db, 'loans'), where('userId', '==', userId));
    
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

    return unsubscribe;
  }, [userId]);

  const addLoan = useCallback(async (loanData) => {
    try {
      const { monthlyDue, totalAmount, totalInterest } = calculateLoanDetails(
        loanData.totalPrice,
        loanData.downpayment || 0,
        loanData.terms,
        loanData.monthlyInterestRate
      );

      const loanRef = await addDoc(collection(db, 'loans'), {
        ...loanData,
        monthlyDue,
        totalAmount,
        totalInterest,
        remainingBalance: totalAmount - (loanData.downpayment || 0),
        totalPaid: loanData.downpayment || 0,
        paymentProgress: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
        userId
      });

      return { id: loanRef.id, ...loanData };
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [userId]);

  const updateLoan = useCallback(async (loanId, updates) => {
    try {
      await updateDoc(doc(db, 'loans', loanId), updates);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const deleteLoan = useCallback(async (loanId) => {
    try {
      await deleteDoc(doc(db, 'loans', loanId));
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const recordPayment = useCallback(async (loanId, paymentData) => {
    try {
      // Add payment to payments collection
      const paymentRef = await addDoc(collection(db, 'payments'), {
        ...paymentData,
        loanId,
        userId,
        paymentDate: new Date().toISOString()
      });

      // Update loan status
      const loan = loans.find(l => l.id === loanId);
      const newTotalPaid = loan.totalPaid + paymentData.amount;
      const newProgress = (newTotalPaid / loan.totalAmount) * 100;
      
      let newStatus = loan.status;
      if (newProgress >= 100) {
        newStatus = 'paid';
      } else if (paymentData.isLate) {
        newStatus = 'late';
      }

      await updateDoc(doc(db, 'loans', loanId), {
        totalPaid: newTotalPaid,
        paymentProgress: newProgress,
        status: newStatus,
        lastPaymentDate: new Date().toISOString()
      });

      return { id: paymentRef.id, ...paymentData };
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [loans, userId]);

  return { 
    loans, 
    loading, 
    error, 
    addLoan, 
    updateLoan, 
    deleteLoan, 
    recordPayment 
  };
};