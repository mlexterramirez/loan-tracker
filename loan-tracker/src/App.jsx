import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Borrowers from './pages/Borrowers';
import BorrowerDetail from './pages/BorrowerDetail';
import Loans from './pages/Loans';
import AddEditLoan from './pages/AddEditLoan';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Login from './pages/Login';  // No curly braces - default import
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-right" />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/borrowers" element={<Borrowers />} />
              <Route path="/borrowers/:id" element={<BorrowerDetail />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/loans/new" element={<AddEditLoan />} />
              <Route path="/loans/:id" element={<AddEditLoan />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;