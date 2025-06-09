import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { generateUUID } from '../utils/helpers';

export const useBorrowers = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'borrowers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const borrowersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBorrowers(borrowersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addBorrower = async (borrowerData) => {
    const borrowerId = generateUUID();
    await setDoc(doc(db, 'borrowers', borrowerId), {
      ...borrowerData,
      borrowerId,
      loanStats: {
        totalLoans: 0,
        latePayments: 0,
        totalPaid: 0
      }
    });
  };

  return { borrowers, loading, addBorrower };
};