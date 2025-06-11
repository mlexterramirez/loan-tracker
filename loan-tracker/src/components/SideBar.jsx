// src/components/Sidebar.jsx
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  LogoutIcon
} from '@heroicons/react/outline';

export default function Sidebar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: ChartBarIcon },
    { name: 'Borrowers', path: '/borrowers', icon: UsersIcon },
    { name: 'Loans', path: '/loans', icon: CurrencyDollarIcon },
    { name: 'Payments', path: '/payments', icon: CreditCardIcon },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="hidden md:flex md:w-64 bg-white shadow-lg flex-col border-r">
      <div className="p-4 text-center bg-primary-500">
        <h1 className="text-2xl font-bold text-white">LoanMate</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-100 text-primary-600 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <item.icon className="h-6 w-6 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
              {currentUser.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium truncate max-w-[120px]">{currentUser.email}</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-500"
            title="Logout"
          >
            <LogoutIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}