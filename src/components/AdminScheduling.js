import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import { createSession } from '../services/api';

const AdminScheduling = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [sessionType, setSessionType] = useState('one-on-one');

  const handleSchedule = async () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one participant.');
      return;
    }

    const scheduledTime = new Date(date);
    const [startHour, startMinute] = startTime.split(':');
    scheduledTime.setHours(parseInt(startHour), parseInt(startMinute));

    const sessionData = {
      title: `Session: ${sessionType}`,
      description: `A ${sessionType} session.`,
      participants: selectedUsers,
      scheduledTime: scheduledTime.toISOString(),
      sessionType,
    };

    try {
      await createSession(sessionData);
      alert('Session scheduled successfully!');
      // Optionally, reset the form or fetch updated sessions
    } catch (error) {
      console.error('Error scheduling session:', error.response.data.message);
      alert(error.response.data.message || 'Failed to schedule session');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Admin Scheduling</h2>
      <div className="mb-4">
        <label className="block mb-1">Select Participants</label>
        <select
          multiple
          value={selectedUsers}
          onChange={(e) =>
            setSelectedUsers(Array.from(e.target.selectedOptions, (option) => option.value))
          }
          className="w-full p-2 border rounded"
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} - {user.email}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <label className="block mb-1">Select Date</label>
          <Calendar onChange={setDate} value={date} />
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="mr-4">
            <label className="block mb-1">Start Time</label>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              className="border rounded p-1"
            />
          </div>
          <div>
            <label className="block mb-1">End Time</label>
            <TimePicker
              onChange={setEndTime}
              value={endTime}
              className="border rounded p-1"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Session Type</label>
        <select
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="one-on-one">One-on-One</option>
          <option value="group">Group</option>
        </select>
      </div>
      <button
        onClick={handleSchedule}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Schedule Session
      </button>
    </div>
  );
};

export default AdminScheduling;
