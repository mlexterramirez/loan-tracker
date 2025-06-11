// src/hooks/useBorrowers.js
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

export const useBorrowers = (userId) => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    const q = query(collection(db, 'borrowers'), where('userId', '==', userId));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const borrowersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBorrowers(borrowersData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  const addBorrower = useCallback(async (borrowerData) => {
    try {
      const borrowerRef = await addDoc(collection(db, 'borrowers'), {
        ...borrowerData,
        createdAt: new Date().toISOString(),
        userId
      });
      return { id: borrowerRef.id, ...borrowerData };
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [userId]);

  const updateBorrower = useCallback(async (borrowerId, updates) => {
    try {
      await updateDoc(doc(db, 'borrowers', borrowerId), updates);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const deleteBorrower = useCallback(async (borrowerId) => {
    try {
      await deleteDoc(doc(db, 'borrowers', borrowerId));
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  return { 
    borrowers, 
    loading, 
    error, 
    addBorrower, 
    updateBorrower, 
    deleteBorrower 
  };
};