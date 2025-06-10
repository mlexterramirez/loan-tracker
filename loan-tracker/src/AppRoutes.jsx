// src/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Borrowers from './pages/Borrowers';
import Loans from './pages/Loans';
import Payments from './pages/Payments';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/borrowers" element={<Borrowers />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/payments" element={<Payments />} />
        </Route>
      </Route>
    </Routes>
  );
}