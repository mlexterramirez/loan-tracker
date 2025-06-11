// src/components/BorrowerList.jsx
import { UserIcon, MailIcon, PhoneIcon, HomeIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { formatPhoneNumber } from '../utils/helpers';

export default function BorrowerList({ borrowers, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loans</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {borrowers.map((borrower) => (
            <tr key={borrower.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <div className="font-medium text-gray-900">{borrower.fullName}</div>
                    {borrower.email && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MailIcon className="h-4 w-4 mr-1" />
                        {borrower.email}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {borrower.phone && (
                  <div className="flex items-center text-sm text-gray-500">
                    <PhoneIcon className="h-4 w-4 mr-1" />
                    {formatPhoneNumber(borrower.phone)}
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                {borrower.address && (
                  <div className="flex items-center text-sm text-gray-500">
                    <HomeIcon className="h-4 w-4 mr-1" />
                    {borrower.address}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {borrower.loanCount || 0}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(borrower)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                  title="Edit"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(borrower.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {borrowers.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No borrowers found. Add your first borrower to get started.
        </div>
      )}
    </div>
  );
}