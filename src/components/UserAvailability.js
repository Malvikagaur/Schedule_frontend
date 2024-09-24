import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import { setAvailability, deleteAvailabilitySlot } from '../services/api';

const UserAvailability = ({ availability, fetchAvailability }) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const handleAddAvailability = async () => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const availabilityData = {
      day,
      startTime,
      endTime,
    };

    try {
      await setAvailability(availabilityData);
      alert('Availability added successfully!');
      fetchAvailability();
    } catch (error) {
      console.error('Error setting availability:', error.response.data.message);
      alert(error.response.data.message || 'Failed to set availability');
    }
  };

  const handleDeleteAvailability = async (id) => {
    if (window.confirm('Are you sure you want to delete this availability slot?')) {
      try {
        await deleteAvailabilitySlot(id);
        alert('Availability deleted successfully!');
        fetchAvailability();
      } catch (error) {
        console.error('Error deleting availability:', error);
        alert('Failed to delete availability');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-2xl mb-4">Manage Your Availability</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <Calendar onChange={setDate} value={date} />
        <div className="mt-4 md:mt-0">
          <div className="mb-2">
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
      <button
        onClick={handleAddAvailability}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Availability
      </button>

      <h3 className="text-xl mt-6 mb-2">Your Availability Slots</h3>
      {availability.length === 0 ? (
        <p>No availability set.</p>
      ) : (
        <ul>
          {availability.map((slot) => (
            <li key={slot._id} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded">
              <span>
                <strong>{slot.day}:</strong> {slot.startTime} - {slot.endTime}
              </span>
              <button
                onClick={() => handleDeleteAvailability(slot._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAvailability;
