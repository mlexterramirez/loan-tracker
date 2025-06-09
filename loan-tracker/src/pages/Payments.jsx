import { usePayments } from '../hooks/useLoans'; 
import { formatCurrency } from '../utils/helpers';

const Payments = () =>{
  const { payments, loading } = usePayments();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payments</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map(payment => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.loanName || 'Unknown Loan'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(payment.amountPaid)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.paymentStatus === 'Full' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments; 