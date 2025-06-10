import React from 'react';

const OverdueLoansList = ({ loans }) => {
  if (loans.length === 0) {
    return <p className="text-gray-500">No overdue loans</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Due</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loans.map(loan => (
            <tr key={loan.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{loan.borrowerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{loan.itemName}</td>
              <td className="px-6 py-4 whitespace-nowrap">₱{loan.monthlyDue.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-red-500">
                {Math.floor(Math.random() * 10) + 1} days
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverdueLoansList;