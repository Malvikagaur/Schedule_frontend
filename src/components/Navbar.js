import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-yellow-300 transition duration-300 ease-in-out"
        >
          Scheduling App
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/user"
                className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
              >
                User Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

