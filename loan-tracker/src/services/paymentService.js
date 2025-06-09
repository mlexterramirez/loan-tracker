import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export const addPayment = async (paymentData) => {
  const paymentRef = await addDoc(collection(db, 'payments'), paymentData);
  return { ...paymentData, id: paymentRef.id };
};

export const getPaymentsByLoan = async (loanId) => {
  const q = query(collection(db, 'payments'), where('loanId', '==', loanId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};