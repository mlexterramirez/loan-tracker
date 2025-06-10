import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Borrowers from './pages/Borrowers'
import Loans from './pages/Loans'
import Payments from './pages/Payments'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-gradient-to-br from-primary-100 to-secondary-100">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Navbar />
            <main className="p-6">
              <Toaster position="top-right" toastOptions={{
                className: '!bg-primary-500 !text-white',
              }} />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/borrowers" element={<Borrowers />} />
                  <Route path="/loans" element={<Loans />} />
                  <Route path="/payments" element={<Payments />} />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App