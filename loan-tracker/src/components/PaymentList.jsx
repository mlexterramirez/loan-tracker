// src/components/PaymentList.jsx
import { CurrencyDollarIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/outline';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function PaymentList({ payments }) {
  return (
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
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{formatDate(payment.paymentDate)}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{payment.loanName}</div>
                <div className="text-sm text-gray-500">{payment.borrowerName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{formatCurrency(payment.amount)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize">
                  {payment.paymentMethod}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="capitalize">{payment.isLate ? 'Late' : 'On Time'}</span>
                </div>
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