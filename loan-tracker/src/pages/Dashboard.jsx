import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import LoanSummaryCard from '../components/LoanSummaryCard';
import OverdueLoansList from '../components/OverdueLoansList';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLoans: 0,
    activeLoans: 0,
    overdueLoans: 0,
    totalAmount: 0
  });
  const [overdueLoans, setOverdueLoans] = useState([]);

  useEffect(() => {
    const loansQuery = query(collection(db, 'loans'));
    
    const unsubscribe = onSnapshot(loansQuery, (snapshot) => {
      let totalAmount = 0;
      let activeCount = 0;
      let overdueCount = 0;
      const overdue = [];
      
      snapshot.forEach(doc => {
        const loan = doc.data();
        totalAmount += loan.totalPrice;
        
        if (loan.status === 'active') activeCount++;
        if (loan.status === 'late' || loan.status === 'defaulted') {
          overdueCount++;
          overdue.push({ id: doc.id, ...loan });
        }
      });
      
      setStats({
        totalLoans: snapshot.size,
        activeLoans: activeCount,
        overdueLoans: overdueCount,
        totalAmount
      });
      setOverdueLoans(overdue);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Loan Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <LoanSummaryCard title="Total Loans" value={stats.totalLoans} />
        <LoanSummaryCard title="Active Loans" value={stats.activeLoans} />
        <LoanSummaryCard title="Overdue Loans" value={stats.overdueLoans} />
        <LoanSummaryCard 
          title="Total Amount" 
          value={`₱${stats.totalAmount.toLocaleString()}`} 
        />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Overdue Loans</h2>
        <OverdueLoansList loans={overdueLoans} />
      </div>
    </div>
  );
};

export default Dashboard;