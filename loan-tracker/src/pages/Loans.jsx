import { useState, useEffect } from 'react';
import { useLoans, useBorrowers } from '../hooks';
import LoanForm from '../components/LoanForm';
import { PlusIcon } from '@heroicons/react/outline';
import { formatCurrency } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
export default function Loans() {
  const { user } = useAuth();
  const { loans, loading, error, addLoan } = useLoans();
  const { borrowers } = useBorrowers();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchLoans(user.uid);
    }
  }, [user]);

  const handleSubmit = async (loanData) => {
    try {
      await addLoan(loanData, user.uid);
      setShowForm(false);
    } catch (err) {
      console.error('Error adding loan:', err);
    }
  };

  if (loading) return <div>Loading loans...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Loan Management</h1>
        <button
          onClick={() => setShowForm(true)}
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
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table headers and rows */}
        </table>
      </div>
    </div>
  );
}