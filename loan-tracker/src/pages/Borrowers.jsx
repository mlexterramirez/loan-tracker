import { useState } from 'react'
import { useBorrowers } from '../hooks/useBorrowers'
import BorrowerForm from '../components/BorrowerForm'
import { PlusIcon } from '@heroicons/react/outline'

export default function Borrowers() {
  const { borrowers, addBorrower } = useBorrowers()
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (borrowerData) => {
    await addBorrower(borrowerData)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Borrowers</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-1 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Borrower</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <BorrowerForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Loans</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {borrowers.map(borrower => (
              <tr key={borrower.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                      {borrower.fullName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">{borrower.fullName}</div>
                      <div className="text-sm text-gray-500">{borrower.contactEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{borrower.primaryContact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {borrower.loanStats?.totalLoans || 0} loans
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-primary-600 hover:text-primary-900 mr-4">Edit</button>
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