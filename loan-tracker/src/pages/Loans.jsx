import { useLoans } from '../hooks/useLoans';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

const Loans = () =>  {
  const { loans, loading } = useLoans();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Loans</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/borrowers/${loan.borrowerId}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {loan.borrowerName || 'Unknown'}
                  </Link>
                </td>
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
                  <Link
                    to={`/loans/${loan.id}`}
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
};
export default Loans; 