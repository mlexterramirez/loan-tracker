// src/components/PaymentList.jsx
import { CurrencyDollarIcon, CalendarIcon, CreditCardIcon } from '@heroicons/react/outline';
import { formatCurrency, formatDate } from '../utils/helpers';

const methodIcons = {
  cash: <CurrencyDollarIcon className="h-5 w-5 text-green-500" />,
  bank: <CreditCardIcon className="h-5 w-5 text-blue-500" />,
  gcash: <CurrencyDollarIcon className="h-5 w-5 text-purple-500" />,
  other: <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
};

export default function PaymentList({ payments }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium">{payment.loanId}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{formatCurrency(payment.amount)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{formatDate(payment.paymentDate)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {methodIcons[payment.paymentMethod] || methodIcons.other}
                  <span className="ml-2 capitalize">{payment.paymentMethod}</span>
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