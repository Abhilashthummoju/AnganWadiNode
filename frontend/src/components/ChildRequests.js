import React, { useState, useEffect } from 'react';

const ChildRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:8000/children/requests');
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await fetch('http://localhost:8000/admin/approve-child', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ childId: id }),
      });
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error('Error approving child request:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await fetch('http://localhost:8000/children/requests', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error('Error declining child request:', error);
    }
  };

  const containerStyle = {
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    background: '#f8f9fa',
    height: '100%',
  };

  const headerStyle = {
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    background: '#fff',
  };

  const buttonStyle = {
    margin: '5px',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const acceptButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: '#fff',
  };

  const declineButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Child Registration Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : requests.length === 0 ? (
        <p>No Requests to join</p>
      ) : (
        <ul style={listStyle}>
          {requests.map((request) => (
            <li key={request.id} style={listItemStyle}>
              <p><strong>Name:</strong> {request.name}</p>
              <p><strong>Age:</strong> {request.age}</p>
              <p><strong>Father's Name:</strong> {request.fathersName}</p>
              <p><strong>Mother's Name:</strong> {request.mothersName}</p>
              <p><strong>Date of Birth:</strong> {request.dateOfBirth}</p>
              <button style={acceptButtonStyle} onClick={() => handleAccept(request.id)}>Accept</button>
              <button style={declineButtonStyle} onClick={() => handleDecline(request.id)}>Decline</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChildRequests;
