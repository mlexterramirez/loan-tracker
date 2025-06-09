import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useState, useEffect } from 'react';
import LoanForm from '../components/LoanForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function AddEditLoan() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchLoan = async () => {
      const docRef = doc(db, 'loans', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLoan(docSnap.data());
      }
      setLoading(false);
    };
    fetchLoan();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      if (id) {
        await updateDoc(doc(db, 'loans', id), data);
        toast.success('Loan updated successfully');
      } else {
        // This would be handled by the LoanForm component through useLoans hook
      }
      navigate('/loans');
    } catch (error) {
      toast.error('Error saving loan');
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{id ? 'Edit Loan' : 'Add New Loan'}</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <LoanForm 
          loan={loan} 
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}