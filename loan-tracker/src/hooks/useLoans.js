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
  calculateNextDueDate,
  getCurrentOverdueLoans,
  processPayment
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

  const updateLoan = useCallback(async (loanId, updateData) => {
    try {
      const loanRef = doc(db, 'loans', loanId);
      await updateDoc(loanRef, updateData);
      return true;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const deleteLoan = useCallback(async (loanId) => {
    try {
      await deleteDoc(doc(db, 'loans', loanId));
      return true;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const recordPayment = useCallback(async (loanId, paymentData) => {
    const loanRef = doc(db, 'loans', loanId);
    
    try {
      const loan = loans.find(l => l.id === loanId);
      if (!loan) throw new Error('Loan not found');

      const paymentResult = processPayment(loan, paymentData.amount);
      const updates = {
        totalPaid: (loan.totalPaid || 0) + paymentResult.amountCleared,
        lastPaymentDate: serverTimestamp(),
      };

      if (paymentResult.isFullPayment) {
        updates.status = 'active';
        updates.nextDueDate = calculateNextDueDate(loan);
        updates.penalty = 0;
        updates.cumulativeAmount = 0;
        updates.totalDue = null;
        updates.isOverdue = false;
        updates.overdueSince = null;
        
        // Handle any remaining amount if payment was more than due
        if (paymentResult.remainingAmount > 0) {
          updates.totalPaid += paymentResult.remainingAmount;
        }
      }

      await updateDoc(loanRef, updates);
      return true;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [loans]);

  return { 
    loans, 
    loading, 
    error, 
    addLoan, 
    updateLoan, 
    deleteLoan, 
    recordPayment,
    overdueLoans: getCurrentOverdueLoans(loans)
  };
};