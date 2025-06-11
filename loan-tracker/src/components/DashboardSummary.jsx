// src/components/DashboardSummary.jsx
import { 
  CurrencyDollarIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ClockIcon
} from '@heroicons/react/outline';
import { formatCurrency } from '../utils/helpers';

export default function DashboardSummary({ loans, payments }) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate monthly receivables (all active loans' monthly dues)
  const monthlyReceivables = loans
    .filter(loan => loan.status === 'active')
    .reduce((sum, loan) => sum + loan.monthlyDue, 0);

  // Calculate received payments this month
  const monthlyReceived = payments
    .filter(payment => {
      const paymentDate = payment.paymentDate?.toDate 
        ? payment.paymentDate.toDate() 
        : new Date(payment.paymentDate);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear;
    })
    .reduce((sum, payment) => sum + payment.amount, 0);

  // Count overdue loans
  const overdueLoans = loans.filter(loan => 
    loan.status.includes('delayed') || loan.status === 'late'
  ).length;

  // Count active loans
  const activeLoans = loans.filter(loan => 
    loan.status === 'active'
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
          <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-500" />
          <span>Monthly Receivables</span>
        </div>
        <p className="text-2xl font-bold">{formatCurrency(monthlyReceivables)}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
          <span>Received This Month</span>
        </div>
        <p className="text-2xl font-bold">{formatCurrency(monthlyReceived)}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 text-orange-500" />
          <span>Overdue Loans</span>
        </div>
        <p className="text-2xl font-bold">{overdueLoans}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
          <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
          <span>Active Loans</span>
        </div>
        <p className="text-2xl font-bold">{activeLoans}</p>
      </div>
    </div>
  );
}