// src/components/OverdueLoansList.jsx
import { CurrencyDollarIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function OverdueLoansList({ loans }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Due</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penalty</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loans.map((loan) => {
            const daysOverdue = loan.status.includes('(') 
              ? parseInt(loan.status.match(/\((\d+) days\)/)[1]) 
              : 0;
            
            return (
              <tr key={loan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{loan.borrowerName}</div>
                  <div className="text-sm text-gray-500">{loan.itemName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span>{formatCurrency(loan.amountDue || loan.monthlyDue)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ExclamationCircleIcon className="h-5 w-5 text-orange-500 mr-1" />
                    <span>{daysOverdue} days</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {loan.penalty ? formatCurrency(loan.penalty) : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loans.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No overdue loans currently.
        </div>
      )}
    </div>
  );
}