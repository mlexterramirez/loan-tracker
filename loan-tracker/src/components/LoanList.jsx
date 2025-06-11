// src/components/LoanList.jsx
import { CurrencyDollarIcon, ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { formatCurrency, formatDate } from '../utils/helpers';

const statusIcons = {
  active: <ClockIcon className="h-5 w-5 text-blue-500" />,
  late: <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />,
  paid: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  defaulted: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
};

const statusColors = {
  active: 'bg-blue-100 text-blue-800',
  late: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  defaulted: 'bg-red-100 text-red-800'
};

export default function LoanList({ loans, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loans.map((loan) => (
            <tr key={loan.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{loan.borrowerName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900">{loan.itemName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{formatCurrency(loan.totalAmount)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {statusIcons[loan.status]}
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[loan.status]}`}>
                    {loan.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-500">{formatDate(loan.startDate)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(loan)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(loan.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loans.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No loans found. Create your first loan to get started.
        </div>
      )}
    </div>
  );
}