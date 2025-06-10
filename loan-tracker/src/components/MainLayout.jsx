// src/components/MainLayout.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Borrowers from '../pages/Borrowers';
import Loans from '../pages/Loans';
import Payments from '../pages/Payments';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function MainLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/borrowers" element={<Borrowers />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}