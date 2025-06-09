import { useLoans } from '../hooks/useLoans';
import { calculateLoanStats } from '../utils/loanCalculations';
import LoanSummaryCard from '../components/LoanSummaryCard';
import PaymentChart from '../components/PaymentChart';
import OverdueLoansList from '../components/OverdueLoansList';
import { UsersIcon, CurrencyDollarIcon, ClockIcon, ExclamationIcon } from '@heroicons/react/outline';

const Dashboard = () => {
  const { loans, loading } = useLoans();
  const stats = calculateLoanStats(loans);
  const overdueLoans = loans.filter(loan => loan.status === 'late');

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LoanSummaryCard 
          title="Total Loans" 
          value={stats.totalLoans} 
          icon={<UsersIcon className="h-6 w-6" />}
          color="blue"
        />
        <LoanSummaryCard 
          title="Total Collected" 
          value={stats.totalPaid} 
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          color="green"
        />
        <LoanSummaryCard 
          title="Active Loans" 
          value={loans.filter(l => l.status === 'active').length} 
          icon={<ClockIcon className="h-6 w-6" />}
          color="yellow"
        />
        <LoanSummaryCard 
          title="Overdue Loans" 
          value={stats.latePayments} 
          icon={<ExclamationIcon className="h-6 w-6" />}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PaymentChart 
          paid={stats.totalPaid} 
          remaining={loans.reduce((sum, loan) => sum + (loan.totalPrice - loan.totalPaid), 0)} 
        />
        <OverdueLoansList loans={overdueLoans} />
      </div>
    </div>
  );
  
};
export default Dashboard;  // Make sure this is at the bottom