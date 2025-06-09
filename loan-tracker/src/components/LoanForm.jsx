import { useForm } from 'react-hook-form';
import { calculateMonthlyPayment } from '../utils/loanCalculations';
import { formatCurrency } from '../utils/helpers';

const LoanForm = () =>({ borrower, onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const terms = watch('terms', 3);
  const interestRate = watch('monthlyInterestPct', 5);
  const principal = watch('totalPrice', 0) - (watch('downpayment', 0) || 0);

  const monthlyPayment = calculateMonthlyPayment(principal, terms, interestRate);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Item Name</label>
          <input
            {...register('itemName', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.itemName && <span className="text-red-500">Required</span>}
        </div>
        <div>
          <label className="block mb-1">Total Price</label>
          <input
            type="number"
            {...register('totalPrice', { required: true, min: 1 })}
            className="w-full p-2 border rounded"
          />
          {errors.totalPrice && <span className="text-red-500">Required</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">Downpayment</label>
          <input
            type="number"
            {...register('downpayment')}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Terms (months)</label>
          <select
            {...register('terms')}
            className="w-full p-2 border rounded"
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Interest Rate (%)</label>
          <input
            type="number"
            {...register('monthlyInterestPct')}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-medium">Payment Preview</h3>
        <p>Monthly Payment: {formatCurrency(monthlyPayment)}</p>
        <p>Total Interest: {formatCurrency(monthlyPayment * terms - principal)}</p>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Loan
      </button>
    </form>
  );
};
export default LoanForm;