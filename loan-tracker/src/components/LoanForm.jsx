import { useState } from 'react';
import { formatCurrency } from '../utils/helpers';

export default function LoanForm({ borrowers, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    borrowerId: '',
    borrowerName: '',
    itemName: '',
    totalPrice: '',
    downpayment: '',
    terms: 6,
    monthlyInterestPct: 5,
    startDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update borrower name when borrowerId changes
    if (name === 'borrowerId') {
      const selectedBorrower = borrowers.find(b => b.id === value);
      if (selectedBorrower) {
        setFormData(prev => ({
          ...prev,
          borrowerName: selectedBorrower.fullName
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      totalPrice: parseFloat(formData.totalPrice),
      downpayment: parseFloat(formData.downpayment || 0),
      terms: parseInt(formData.terms),
      monthlyInterestPct: parseFloat(formData.monthlyInterestPct)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Borrower</label>
          <select
            name="borrowerId"
            value={formData.borrowerId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Add other form fields here */}
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Loan
        </button>
      </div>
    </form>
  );
}