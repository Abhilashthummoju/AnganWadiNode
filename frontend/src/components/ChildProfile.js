// components/ChildProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChildProfile = () => {
  const [child, setChild] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchChildProfile = async () => {
      try {
        const childId = JSON.parse(localStorage.getItem("childrenId"));

        console.log("Child ID:",childId);
        const response = await axios.get(`http://localhost:8000/children/${childId}`);
        setChild(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching child profile');
        setChild(null);
      }
    };

    fetchChildProfile();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>
      {error && <p style={styles.error}>{error}</p>}
      {child ? (
        <div style={styles.profile}>
          <div style={styles.infoContainer}>
            <p style={styles.infoItem}><strong>Name:</strong> {child.name}</p>
            <p style={styles.infoItem}><strong>Age:</strong> {child.age}</p>
            <p style={styles.infoItem}><strong>Father's Name:</strong> {child.fathersName}</p>
            <p style={styles.infoItem}><strong>Mother's Name:</strong> {child.mothersName}</p>
            <p style={styles.infoItem}><strong>Date of Birth:</strong> {child.dateOfBirth}</p>
          </div>
        </div>
      ) : (
        <p style={styles.loading}>Loading...</p>
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
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  profile: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoItem: {
    marginBottom: '12px',
    fontSize: '16px',
    color: '#555',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    color: '#777',
  },
};

export default ChildProfile;
