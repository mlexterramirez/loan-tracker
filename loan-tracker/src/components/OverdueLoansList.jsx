import { formatCurrency } from '../utils/helpers';

const OverdueLoansList = () => ({ loans }) =>{
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-4">Overdue Loans</h3>
      {loans.length === 0 ? (
        <p className="text-gray-500">No overdue loans</p>
      ) : (
        <ul className="space-y-2">
          {loans.map(loan => (
            <li key={loan.id} className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-medium">{loan.itemName}</span>
                <span className="text-red-500">{formatCurrency(loan.monthlyDue)}</span>
              </div>
              <div className="text-sm text-gray-500">
                {loan.borrowerName} • {loan.paymentProgress}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default OverdueLoansList;  