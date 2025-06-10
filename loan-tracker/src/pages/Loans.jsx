import { useState } from 'react'
import { useLoans, useBorrowers } from '../hooks'
import LoanForm from '../components/LoanForm'
import { PlusIcon } from '@heroicons/react/outline'
import { formatCurrency } from '../utils/helpers'

export default function Loans() {
  const { loans, addLoan } = useLoans()
  const { borrowers } = useBorrowers()
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (loanData) => {
    await addLoan(loanData)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Loans</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-1 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Loan</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <LoanForm 
            borrowers={borrowers} 
            onSubmit={handleSubmit} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map(loan => (
              <tr key={loan.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{loan.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-sm font-bold">
                      {loan.borrowerName?.charAt(0)}
                    </div>
                    <div className="ml-3">{loan.borrowerName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(loan.totalPrice)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    loan.status === 'active' ? 'bg-green-100 text-green-800' :
                    loan.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {loan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-primary-600 hover:text-primary-900 mr-4">View</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}