// src/components/PaymentList.jsx
import { CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/outline';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function PaymentList({ payments }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{payment.loanId}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{formatCurrency(payment.amount)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(payment.paymentDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {payments.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No payments recorded yet.
        </div>
      )}
    </div>
  );
}