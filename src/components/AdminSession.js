import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const AdminSession = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sessionType, setSessionType] = useState('one-on-one');
  const [timeSlot, setTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch user availability data
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission for scheduling session
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedUsers.length || !timeSlot) {
      setError('Please select users and a time slot.');
      return;
    }

    const sessionData = {
      users: selectedUsers,
      sessionType,
      timeSlot,
    };

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess('Session scheduled successfully!');
        setSelectedUsers([]);
        setTimeSlot('');
      } else {
        setError(result.message || 'Failed to schedule session');
      }
    } catch (error) {
      setError('Error scheduling session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting/deselecting users for the session
  const handleUserSelect = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Schedule Session</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      {loading && <Loading />}

      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Select Users:</h2>
            <div className="grid grid-cols-2 gap-4">
              {users.map((user) => (
                <label key={user._id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={user._id}
                    onChange={() => handleUserSelect(user._id)}
                    checked={selectedUsers.includes(user._id)}
                    className="mr-2"
                  />
                  {user.name} - {user.email}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Session Type:</h2>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              <option value="one-on-one">One-on-One</option>
              <option value="group">Group Session</option>
            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Select Time Slot:</h2>
            <input
              type="time"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Scheduling...' : 'Schedule Session'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminSession;
