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
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">
        Scheduling App
      </Link>
      <div>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-white mr-4">
                Admin Dashboard
              </Link>
            )}
            <Link to="/user" className="text-white mr-4">
              User Dashboard
            </Link>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white mr-4">
              Login
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
