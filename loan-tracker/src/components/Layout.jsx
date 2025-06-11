// src/components/Layout.jsx
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-100 to-secondary-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}