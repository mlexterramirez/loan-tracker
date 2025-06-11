// src/pages/Borrowers.jsx
import { useState } from 'react';
import { useBorrowers } from '../hooks';
import BorrowerForm from '../components/BorrowerForm';
import BorrowerList from '../components/BorrowerList';
import { PlusIcon } from '@heroicons/react/outline';
import { useAuth } from '../hooks/useAuth';

export default function Borrowers() {
  const { currentUser } = useAuth();
  const { borrowers, loading, error, addBorrower, updateBorrower, deleteBorrower } = useBorrowers(currentUser?.uid);
  const [showForm, setShowForm] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const handleSubmit = async (borrowerData) => {
    try {
      if (selectedBorrower) {
        await updateBorrower(selectedBorrower.id, borrowerData);
      } else {
        await addBorrower(borrowerData);
      }
      setShowForm(false);
      setSelectedBorrower(null);
    } catch (err) {
      console.error('Error saving borrower:', err);
    }
  };

  const handleDelete = async (borrowerId) => {
    if (window.confirm('Are you sure you want to delete this borrower?')) {
      try {
        await deleteBorrower(borrowerId);
      } catch (err) {
        console.error('Error deleting borrower:', err);
      }
    }
  };

  if (loading) return <div>Loading borrowers...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Borrower Management</h1>
        <button
          onClick={() => {
            setSelectedBorrower(null);
            setShowForm(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Borrower</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <BorrowerForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedBorrower(null);
            }}
            initialData={selectedBorrower}
          />
        </div>
      )}

      <BorrowerList 
        borrowers={borrowers}
        onEdit={(borrower) => {
          setSelectedBorrower(borrower);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}