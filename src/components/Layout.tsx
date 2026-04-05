import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useEffect } from 'react';

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
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-800 dark:bg-slate-950 text-white flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold">Skyline</h1>
          <p className="text-xs text-slate-400">IT Service Catalogue</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
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
            className="w-full px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
      
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
