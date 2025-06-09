import { useForm } from 'react-hook-form';
import { formatCurrency } from '../utils/helpers';

export default function PaymentForm({ loan, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-medium">Loan Details</h3>
        <p>Item: {loan.itemName}</p>
        <p>Monthly Due: {formatCurrency(loan.monthlyDue)}</p>
        <p>Remaining Balance: {formatCurrency(loan.totalPrice - loan.totalPaid)}</p>
      </div>

      <div>
        <label className="block mb-1">Amount Paid</label>
        <input
          type="number"
          {...register('amountPaid', { 
            required: true,
            min: 1,
            max: loan.totalPrice - loan.totalPaid
          })}
          className="w-full p-2 border rounded"
        />
        {errors.amountPaid && (
          <span className="text-red-500">
            {errors.amountPaid.type === 'required' && 'Required'}
            {errors.amountPaid.type === 'min' && 'Must be at least 1'}
            {errors.amountPaid.type === 'max' && 'Cannot exceed remaining balance'}
          </span>
        )}
      </div>

      <div>
        <label className="block mb-1">Payment Method</label>
        <select
          {...register('paymentMethod', { required: true })}
          className="w-full p-2 border rounded"
        >
          <option value="Cash">Cash</option>
          <option value="GCash">GCash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Check">Check</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Payment Status</label>
        <select
          {...register('paymentStatus', { required: true })}
          className="w-full p-2 border rounded"
        >
          <option value="Full">Full</option>
          <option value="Partial">Partial</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Record Payment
      </button>
    </form>
  );
}