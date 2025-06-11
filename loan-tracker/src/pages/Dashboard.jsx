// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import DashboardSummary from '../components/DashboardSummary';
import OverdueLoansList from '../components/OverdueLoansList';
import RecentPayments from '../components/RecentPayments';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [loans, setLoans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    
    // Fetch loans
    const loansQuery = query(
      collection(db, 'loans'), 
      where('userId', '==', currentUser.uid)
    );
    
    const loansUnsubscribe = onSnapshot(loansQuery, (snapshot) => {
      const loansData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoans(loansData);
    });

    // Fetch payments
    const paymentsQuery = query(
      collection(db, 'payments'),
      where('userId', '==', currentUser.uid)
    );

    const paymentsUnsubscribe = onSnapshot(paymentsQuery, (snapshot) => {
      const paymentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPayments(paymentsData);
      setLoading(false);
    });

    return () => {
      loansUnsubscribe();
      paymentsUnsubscribe();
    };
  }, [currentUser]);

  if (loading) return <div>Loading dashboard...</div>;

  const overdueLoans = loans.filter(loan => 
    loan.status.includes('delayed') || loan.status === 'late'
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <DashboardSummary loans={loans} payments={payments} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
          <RecentPayments payments={payments.slice(0, 5)} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Overdue Loans ({overdueLoans.length})
          </h2>
          <OverdueLoansList loans={overdueLoans} />
        </div>
      </div>
    </div>
  );
}