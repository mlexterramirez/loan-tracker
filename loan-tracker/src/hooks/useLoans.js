// src/hooks/useLoans.js
import { useState, useEffect, useCallback } from 'react';
import { 
  collection, query, where, onSnapshot, 
  addDoc, updateDoc, doc, deleteDoc, serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  calculateLoanDetails, 
  checkOverdueStatus,
  calculateNextDueDate
} from '../utils/loanCalculations';

export const useLoans = (userId) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    const q = query(collection(db, 'loans'), where('userId', '==', userId));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const loansData = snapshot.docs.map(doc => {
          const loan = doc.data();
          return {
            id: doc.id,
            ...loan,
            ...checkOverdueStatus(loan)
          };
        });
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

      const nextDueDate = calculateNextDueDate({
        startDate: loanData.startDate || new Date().toISOString()
      });

      const loanRef = await addDoc(collection(db, 'loans'), {
        ...loanData,
        monthlyDue,
        totalAmount,
        totalInterest,
        remainingBalance: totalAmount - (loanData.downpayment || 0),
        totalPaid: loanData.downpayment || 0,
        paymentProgress: 0,
        status: 'active',
        nextDueDate,
        createdAt: serverTimestamp(),
        userId
      });

      return { id: loanRef.id, ...loanData };
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [userId]);

  const recordPayment = useCallback(async (loanId, paymentData) => {
    const loanRef = doc(db, 'loans', loanId);
    const paymentRef = collection(db, 'payments');
    
    try {
      const loan = loans.find(l => l.id === loanId);
      const newTotalPaid = loan.totalPaid + paymentData.amount;
      const isFullyPaid = newTotalPaid >= loan.totalAmount;

      // Add payment record
      await addDoc(paymentRef, {
        ...paymentData,
        loanId,
        userId,
        recordedAt: serverTimestamp()
      });

      // Update loan status
      const updates = {
        totalPaid: newTotalPaid,
        status: isFullyPaid ? 'completed' : loan.status,
        lastPaymentDate: serverTimestamp()
      };

      if (!isFullyPaid) {
        updates.nextDueDate = calculateNextDueDate(loan);
      }

      await updateDoc(loanRef, updates);

      return true;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [loans, userId]);

  // ... keep existing updateLoan and deleteLoan functions ...

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