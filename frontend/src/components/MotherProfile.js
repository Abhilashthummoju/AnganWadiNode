// components/MotherProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MotherProfile = () => {
  const [mother, setMother] = useState(null);
  const [error, setError] = useState(null);
  const motherId = 1; // Replace with the actual mother's ID

  useEffect(() => {
    const fetchMotherProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/mothers/${motherId}`);
        setMother(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching mother profile');
        setMother(null);
      }
    };

    fetchMotherProfile();
  }, [motherId]);
  console.log("MOTHER",mother)
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Profile</h2>
      {error && <p style={styles.error}>{error}</p>}
      {mother ? (
        <div style={styles.profile}>
          <p><strong>First Name:</strong> {mother.firstName}</p>
          <p><strong>Last Name:</strong> {mother.lastName}</p>
          <p><strong>Email:</strong> {mother.email}</p>
          <p><strong>Phone Number:</strong> {mother.phoneNumber}</p>
          <p><strong>Address:</strong> {mother.address}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    margin: 'auto',
    maxWidth: '600px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#007bff',
  },
  profile: {
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
  },
};

export default MotherProfile;
