import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useBorrowers = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'borrowers'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const borrowersData = [];
        snapshot.forEach((doc) => {
          borrowersData.push({ id: doc.id, ...doc.data() });
        });
        setBorrowers(borrowersData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const addBorrower = async (borrowerData) => {
    try {
      const docRef = await addDoc(collection(db, 'borrowers'), borrowerData);
      return { id: docRef.id, ...borrowerData };
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { borrowers, loading, error, addBorrower };
};