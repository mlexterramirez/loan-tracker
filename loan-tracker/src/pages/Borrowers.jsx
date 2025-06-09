import { useState } from 'react';
import { useBorrowers } from '../hooks/useBorrowers';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';
import BorrowerForm from '../components/BorrowerForm';
import { PlusIcon } from '@heroicons/react/outline';

export default function Borrowers() {
  const { borrowers, loading, addBorrower } = useBorrowers();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data) => {
    await addBorrower(data);
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Borrowers</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-1"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Borrower</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow">
          <BorrowerForm onSubmit={handleSubmit} />
          <button
            onClick={() => setShowForm(false)}
            className="mt-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Loans</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {borrowers.map(borrower => (
              <tr key={borrower.borrowerId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/borrowers/${borrower.borrowerId}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {borrower.fullName}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{borrower.primaryContact}</td>
                <td className="px-6 py-4 whitespace-nowrap">{borrower.loanStats.totalLoans}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(borrower.loanStats.totalPaid)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/borrowers/${borrower.borrowerId}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}