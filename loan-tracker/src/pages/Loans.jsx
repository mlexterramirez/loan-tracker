// src/pages/Loans.jsx
import { useState } from 'react';
import { useLoans, useBorrowers } from '../hooks';
import LoanForm from '../components/LoanForm';
import LoanList from '../components/LoanList';
import { PlusIcon } from '@heroicons/react/outline';
import { useAuth } from '../hooks/useAuth';

export default function Loans() {
  const { currentUser } = useAuth();
  const { loans, loading, error, addLoan, updateLoan, deleteLoan } = useLoans(currentUser?.uid);
  const { borrowers, loading: borrowersLoading } = useBorrowers(currentUser?.uid);
  const [showForm, setShowForm] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleSubmit = async (loanData) => {
    try {
      if (selectedLoan) {
        await updateLoan(selectedLoan.id, loanData);
      } else {
        await addLoan(loanData);
      }
      setShowForm(false);
      setSelectedLoan(null);
    } catch (err) {
      console.error('Error saving loan:', err);
    }
  };

  const handleEdit = (loan) => {
    setSelectedLoan(loan);
    setShowForm(true);
  };

  const handleDelete = async (loanId) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      try {
        await deleteLoan(loanId);
      } catch (err) {
        console.error('Error deleting loan:', err);
      }
    }
  };

  if (loading || borrowersLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Loan Management</h1>
        <button
          onClick={() => {
            setSelectedLoan(null);
            setShowForm(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Loan</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <LoanForm
            borrowers={borrowers}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedLoan(null);
            }}
            initialData={selectedLoan}
          />
        </div>
      )}

      <LoanList 
        loans={loans} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}