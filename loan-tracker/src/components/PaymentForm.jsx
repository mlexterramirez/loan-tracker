// src/components/PaymentForm.jsx
import { useState, useEffect } from 'react';
import { CurrencyDollarIcon, CalendarIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { formatCurrency } from '../utils/helpers';

export default function PaymentForm({ loans, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    loanId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
    notes: ''
  });

  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    if (formData.loanId) {
      const loan = loans.find(l => l.id === formData.loanId);
      setSelectedLoan(loan);
      
      if (loan) {
        setFormData(prev => ({
          ...prev,
          amount: (loan.totalDue || loan.monthlyDue).toFixed(2),
          borrowerName: loan.borrowerName,
          loanName: loan.itemName
        }));
      }
    }
  }, [formData.loanId, loans]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      isLate: selectedLoan?.status?.includes('delayed'),
      borrowerName: selectedLoan?.borrowerName,
      loanName: selectedLoan?.itemName
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan*</label>
          <select
            name="loanId"
            value={formData.loanId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Loan</option>
            {loans.map(loan => (
              <option key={loan.id} value={loan.id}>
                {loan.borrowerName} - {loan.itemName} 
                {loan.status?.includes('delayed') ? ` (Overdue: ${formatCurrency(loan.totalDue)})` : ` (${formatCurrency(loan.monthlyDue)})`}
              </option>
            ))}
          </select>
        </div>

        {selectedLoan?.status?.includes('delayed') && (
          <div className="bg-red-50 p-3 rounded-lg border border-red-200 col-span-2">
            <div className="font-bold text-red-800">Overdue Payment</div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
              <div>Monthly Due: {formatCurrency(selectedLoan.monthlyDue)}</div>
              <div>Accumulated: {formatCurrency((selectedLoan.totalDue || 0) - (selectedLoan.monthlyDue || 0))}</div>
              <div className="font-bold">Total Due: {formatCurrency(selectedLoan.totalDue)}</div>
            </div>
            {selectedLoan.overdueSince && (
              <div className="mt-2 text-xs">
                Overdue since: {formatDate(selectedLoan.overdueSince)} ({Math.ceil(
                  (new Date() - new Date(selectedLoan.overdueSince)) / 
                  (1000 * 60 * 60 * 24 * 30)
                )} months)
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount*</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
              min={selectedLoan?.totalDue || selectedLoan?.monthlyDue || 0}
              step="0.01"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Method*</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="cash">Cash</option>
            <option value="bank">Bank Transfer</option>
            <option value="gcash">GCash</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Record Payment
        </button>
      </div>
    </form>
  );
}