import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import MainLayout from './components/MainLayout';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;