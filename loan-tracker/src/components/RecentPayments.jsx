// src/components/RecentPayments.jsx
import { CurrencyDollarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/outline';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function RecentPayments({ payments }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatDate(payment.paymentDate)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{payment.borrowerName}</div>
                <div className="text-sm text-gray-500">{payment.loanName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="font-medium">{formatCurrency(payment.amount)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {payment.status === 'on-time' ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
                  ) : (
                    <ClockIcon className="h-5 w-5 text-yellow-500 mr-1" />
                  )}
                  <span className="capitalize">{payment.status || 'pending'}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {payments.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No recent payments found.
        </div>
      )}
    </div>
  );
}