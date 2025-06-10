import { useForm } from 'react-hook-form';
import { calculateMonthlyPayment, calculateTotalInterest } from '../utils/loanCalculations';

export default function LoanForm({ borrowers, onSubmit, onCancel }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const terms = watch('terms', 6);
  const interestRate = watch('monthlyInterestPct', 5);
  const totalPrice = watch('totalPrice', 0);
  const downpayment = watch('downpayment', 0);
  
  const principal = totalPrice - downpayment;
  const monthlyPayment = calculateMonthlyPayment(principal, terms, interestRate);
  const totalInterest = calculateTotalInterest(principal, terms, monthlyPayment);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Loan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name*</label>
          <input
            {...register('itemName', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.itemName && <p className="mt-1 text-sm text-red-600">Item name is required</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Borrower*</label>
          <select
            {...register('borrowerId', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select Borrower</option>
            {borrowers.map(borrower => (
              <option key={borrower.id} value={borrower.id}>
                {borrower.fullName}
              </option>
            ))}
          </select>
          {errors.borrowerId && <p className="mt-1 text-sm text-red-600">Borrower is required</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Price*</label>
          <input
            type="number"
            {...register('totalPrice', { required: true, min: 1 })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.totalPrice && <p className="mt-1 text-sm text-red-600">Valid amount is required</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Downpayment</label>
          <input
            type="number"
            {...register('downpayment')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Terms (months)*</label>
          <select
            {...register('terms', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="9">9 months</option>
            <option value="12">12 months</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)*</label>
          <input
            type="number"
            step="0.1"
            {...register('monthlyInterestPct', { required: true, min: 0, max: 100 })}
            defaultValue={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.monthlyInterestPct && <p className="mt-1 text-sm text-red-600">Valid rate is required</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
          <input
            type="date"
            {...register('startDate', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.startDate && <p className="mt-1 text-sm text-red-600">Start date is required</p>}
        </div>
      </div>

      {principal > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">Payment Preview</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-sm">Principal:</div>
            <div className="font-medium">${principal.toFixed(2)}</div>
            
            <div className="text-sm">Monthly Payment:</div>
            <div className="font-medium">${monthlyPayment.toFixed(2)}</div>
            
            <div className="text-sm">Total Interest:</div>
            <div className="font-medium">${totalInterest.toFixed(2)}</div>
            
            <div className="text-sm">Total Repayment:</div>
            <div className="font-medium">${(principal + totalInterest).toFixed(2)}</div>
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Create Loan
        </button>
      </div>
    </form>
  );
}