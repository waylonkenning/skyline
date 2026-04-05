import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/services', label: 'Services', icon: '☁️' },
  { path: '/categories', label: 'Categories', icon: '📁' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, darkMode, toggleDarkMode } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className={`
        fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex flex-col
        transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0 md:bg-slate-800 md:dark:bg-slate-950 md:w-64 md:flex
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Skyline</h1>
            <p className="text-xs text-slate-400">IT Service Catalogue</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">{currentUser?.name}</span>
            <button
              onClick={toggleDarkMode}
              className="text-slate-400 hover:text-white text-sm"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Skyline</h1>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-slate-600 dark:text-slate-300 text-2xl"
          >
            ☰
          </button>
        </header>
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
