import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CreditCardIcon
} from '@heroicons/react/outline'

export default function Sidebar() {
  const { user } = useAuth()

  const navItems = [
    { name: 'Dashboard', path: '/', icon: ChartBarIcon },
    { name: 'Borrowers', path: '/borrowers', icon: UserGroupIcon },
    { name: 'Loans', path: '/loans', icon: CurrencyDollarIcon },
    { name: 'Payments', path: '/payments', icon: CreditCardIcon },
  ]

  return (
    <div className="hidden md:flex md:w-64 bg-white shadow-lg flex-col">
      <div className="p-4 text-center bg-primary-500">
        <h1 className="text-2xl font-bold text-white">LoanMate</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
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
      {user && (
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}