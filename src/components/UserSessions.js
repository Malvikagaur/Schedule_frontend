import React, { useEffect, useState } from 'react';
import { getSessions } from '../services/api';

const UserSessions = () => {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const response = await getSessions();
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Your Sessions</h2>
      {sessions.length === 0 ? (
        <p>No upcoming sessions.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session._id} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-semibold">{session.title}</h3>
              <p>{new Date(session.scheduledTime).toLocaleString()}</p>
              <p>Type: {session.sessionType}</p>
              <p>
                Participants:{' '}
                {session.participants.map((p) => p.name).join(', ')}
              </p>
              {/* Add options to modify or cancel if the user is admin or the creator */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSessions;
