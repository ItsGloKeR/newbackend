
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface hover:text-text-primary'
    }`;

  return (
    <header className="bg-surface shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              AniGloK
            </Link>
            {user && (
              <nav className="hidden md:flex items-baseline ml-10 space-x-4">
                <NavLink to="/" className={navLinkClasses} end>Dashboard</NavLink>
                <NavLink to="/watchlist" className={navLinkClasses}>Watchlist</NavLink>
                <NavLink to="/favorites" className={navLinkClasses}>Favorites</NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin" className={navLinkClasses}>Admin</NavLink>
                )}
              </nav>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-text-secondary text-sm">Welcome, {user.email}</span>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                 <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-text-primary bg-primary hover:bg-indigo-500 transition-colors">Login</Link>
                 <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;