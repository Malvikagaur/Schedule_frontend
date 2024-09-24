import React, { useEffect, useState } from 'react';
import AdminScheduling from '../components/AdminScheduling';
import AdminSessions from '../components/AdminSession'; 
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <AdminScheduling users={users} />
      <AdminSessions />
    </div>
  );
};

export default AdminPage;

