import React, { useEffect, useState } from 'react';
import UserAvailability from '../components/UserAvailability';
import UserSessions from '../components/UserSessions';
import axios from 'axios';

const UserPage = () => {
  const [availability, setAvailability] = useState([]);

  const fetchAvailability = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/availability`);
      setAvailability(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <UserAvailability availability={availability} fetchAvailability={fetchAvailability} />
      <UserSessions />
    </div>
  );
};

export default UserPage;
