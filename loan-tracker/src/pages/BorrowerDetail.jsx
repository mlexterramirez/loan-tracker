import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useLoans } from '../hooks/useLoans';
import { useState, useEffect } from 'react';
import LoanForm from '../components/LoanForm';
import { formatCurrency } from '../utils/helpers';
import { PlusIcon } from '@heroicons/react/outline';

const BorrowerDetail = () => {
  const { id } = useParams();
  const [borrower, setBorrower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const { loans, addLoan } = useLoans(id);

  useEffect(() => {
    const fetchBorrower = async () => {
      const docRef = doc(db, 'borrowers', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBorrower(docSnap.data());
      }
      setLoading(false);
    };
    fetchBorrower();
  }, [id]);

  const handleAddLoan = async (loanData) => {
    await addLoan({ ...loanData, borrowerId: id });
    setShowLoanForm(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!borrower) return <div>Borrower not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{borrower.fullName}</h1>
          <p className="text-gray-500">{borrower.primaryContact}</p>
        </div>
        <button
          onClick={() => setShowLoanForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-1"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Loan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-medium mb-2">Contact Information</h2>
          <p>Email: {borrower.contactEmail}</p>
          <p>Home Address: {borrower.homeAddress}</p>
          {borrower.workAddress && <p>Work Address: {borrower.workAddress}</p>}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-medium mb-2">References</h2>
          <div className="space-y-2">
            <div>
              <p className="font-medium">{borrower.referenceContact1.name}</p>
              <p className="text-gray-600">{borrower.referenceContact1.contact}</p>
            </div>
            {borrower.referenceContact2 && (
              <div>
                <p className="font-medium">{borrower.referenceContact2.name}</p>
                <p className="text-gray-600">{borrower.referenceContact2.contact}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showLoanForm && (
        <div className="bg-white p-4 rounded-lg shadow">
          <LoanForm borrower={borrower} onSubmit={handleAddLoan} />
          <button
            onClick={() => setShowLoanForm(false)}
            className="mt-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="font-medium p-4 border-b">Loans</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map(loan => (
              <tr key={loan.id}>
                <td className="px-6 py-4 whitespace-nowrap">{loan.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(loan.totalPrice)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.paymentProgress}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    loan.status === 'active' ? 'bg-green-100 text-green-800' :
                    loan.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {loan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a 
                    href={`/loans/${loan.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowerDetail; 