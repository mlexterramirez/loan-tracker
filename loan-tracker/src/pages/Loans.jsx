import { useState } from 'react';
import { useLoans, useBorrowers } from '../hooks';
import LoanForm from '../components/LoanForm';
import { PlusIcon } from '@heroicons/react/outline';
import { formatCurrency } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';

export default function Loans() {
  const { currentUser } = useAuth();
  const { loans, loading, error, addLoan } = useLoans();
  const { borrowers, loading: borrowersLoading } = useBorrowers();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (loanData) => {
    try {
      await addLoan({
        ...loanData,
        userId: currentUser?.uid
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding loan:', err);
    }
  };

  if (loading || borrowersLoading) return <div>Loading...</div>;
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="px-6 py-4 whitespace-nowrap">{loan.borrowerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(loan.totalPrice)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    loan.status === 'active' ? 'bg-green-100 text-green-800' :
                    loan.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {loan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}