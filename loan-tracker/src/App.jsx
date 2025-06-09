import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Borrowers from './pages/Borrowers';
import BorrowerDetail from './pages/BorrowerDetail';
import Loans from './pages/Loans';
import AddEditLoan from './pages/AddEditLoan';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      {/* ... rest of your App component code ... */}
    </AuthProvider>
  );
};

export default App;