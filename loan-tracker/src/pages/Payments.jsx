// src/pages/Payments.jsx
import { useState } from 'react';
import { usePayments, useLoans } from '../hooks';
import PaymentList from '../components/PaymentList';
import PaymentForm from '../components/PaymentForm';
import { PlusIcon } from '@heroicons/react/outline';
import { useAuth } from '../hooks/useAuth';

export default function Payments() {
  const { currentUser } = useAuth();
  const { payments, loading, error, addPayment } = usePayments(currentUser?.uid);
  const { loans, recordPayment } = useLoans(currentUser?.uid);
  const [showForm, setShowForm] = useState(false);

  const handleAddPayment = async (paymentData) => {
    try {
      await addPayment({
        ...paymentData,
        penaltyAmount: paymentData.penalty || 0,
        principalAmount: paymentData.amount - (paymentData.penalty || 0),
        userId: currentUser.uid
      });

      await recordPayment(paymentData.loanId, {
        amount: paymentData.amount,
        penalty: paymentData.penalty || 0,
        paymentDate: paymentData.paymentDate
      });

      setShowForm(false);
    } catch (err) {
      console.error('Error processing payment:', err);
    }
  };

  if (loading) return <div>Loading payments...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Record Payment</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <PaymentForm
            loans={loans.filter(loan => loan.status !== 'completed')}
            onSubmit={handleAddPayment}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <PaymentList payments={payments} />
    </div>
  );
}