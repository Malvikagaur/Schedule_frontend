import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { getMe } from './services/api';

const App = () => {
  const [user, setUser] = useState(null);

  // Fetch current user on app load if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getMe();
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/user"
              element={
                <ProtectedRoute user={user}>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute user={user} role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<Login setUser={setUser} />}
            />
            <Route
              path="/register"
              element={<Register setUser={setUser} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

