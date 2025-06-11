// src/components/OverdueLoansList.jsx
import { formatCurrency, formatDate } from '../utils/helpers';

export default function OverdueLoansList({ loans }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue Since</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Months</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Due</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loans.map((loan) => (
            <tr key={loan.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium">{loan.borrowerName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>{loan.itemName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(loan.overdueSince)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {loan.overdueMonths}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-bold">
                {formatCurrency(loan.totalDue)}
              </td>
            </tr>
          ))}
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