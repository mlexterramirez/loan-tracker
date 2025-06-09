import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Borrowers from './pages/Borrowers';
import BorrowerDetail from './pages/BorrowerDetail';
import Loans from './pages/Loans';
import AddEditLoan from './pages/AddEditLoan';
import Payments from './pages/Payments';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          {/* Toast Notification Container */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
              error: {
                duration: 5000,
              },
            }}
          />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/borrowers" element={<Borrowers />} />
                <Route path="/borrowers/:id" element={<BorrowerDetail />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/loans/new" element={<AddEditLoan />} />
                <Route path="/loans/:id" element={<AddEditLoan />} />
                <Route path="/payments" element={<Payments />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;