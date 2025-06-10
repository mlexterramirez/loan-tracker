import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Loan Management System</h1>
      </div>
    </header>
  );
}