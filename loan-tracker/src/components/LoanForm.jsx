// src/components/LoanForm.jsx
import { useEffect, useState } from 'react';
import { calculateLoanDetails } from '../utils/loanCalculations';

export default function LoanForm({ 
  borrowers = [],  // Ensure default empty array
  onSubmit, 
  onCancel,
  initialData 
}) {
  const [formData, setFormData] = useState(initialData || {
    borrowerId: '',
    itemName: '',
    totalPrice: '',
    downpayment: '',
    terms: 6,
    monthlyInterestRate: 5,
    startDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [calculation, setCalculation] = useState(null);

  useEffect(() => {
    if (formData.totalPrice && formData.terms && formData.monthlyInterestRate) {
      const calc = calculateLoanDetails(
        parseFloat(formData.totalPrice),
        parseFloat(formData.downpayment || 0),
        parseInt(formData.terms),
        parseFloat(formData.monthlyInterestRate)
      );
      setCalculation(calc);
    }
  }, [formData.totalPrice, formData.downpayment, formData.terms, formData.monthlyInterestRate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      borrowerName: borrowers.find(b => b.id === formData.borrowerId)?.fullName || '',
      totalPrice: parseFloat(formData.totalPrice),
      downpayment: parseFloat(formData.downpayment || 0),
      terms: parseInt(formData.terms),
      monthlyInterestRate: parseFloat(formData.monthlyInterestRate),
      ...calculation
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Borrower Selection */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Borrower*</label>
          <select
            name="borrowerId"
            value={formData.borrowerId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Borrower</option>
            {borrowers.map(borrower => (
              <option key={borrower.id} value={borrower.id}>
                {borrower.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Loan Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name*</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Price*</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Downpayment</label>
          <input
            type="number"
            name="downpayment"
            value={formData.downpayment}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Terms (months)*</label>
          <input
            type="number"
            name="terms"
            value={formData.terms}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Interest Rate (%)*</label>
          <input
            type="number"
            name="monthlyInterestRate"
            value={formData.monthlyInterestRate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            min="0"
            max="100"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Calculation Preview */}
        {calculation && (
          <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Loan Calculation</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>Monthly Payment:</div>
              <div className="col-span-2 font-medium">₱{calculation.monthlyDue.toFixed(2)}</div>
              
              <div>Total Interest:</div>
              <div className="col-span-2 font-medium">₱{calculation.totalInterest.toFixed(2)}</div>
              
              <div>Total Amount:</div>
              <div className="col-span-2 font-medium">₱{calculation.totalAmount.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Notes */}
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
          {initialData ? 'Update Loan' : 'Create Loan'}
        </button>
      </div>
    </form>
  );
}