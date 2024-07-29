// components/MyAttendance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const childId = 1; // Replace with the actual child's ID

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/attendance/${childId}`);
        setAttendanceRecords(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching attendance records');
        setAttendanceRecords([]);
      }
    };

    fetchAttendance();
  }, [childId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Attendance Records</h2>
      {error && <p style={styles.error}>{error}</p>}
      {attendanceRecords.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Date</th>
              <th style={styles.tableCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{record.date}</td>
                <td style={styles.tableCell}>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    margin: 'auto',
    maxWidth: '800px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#333',
    marginBottom: '20px',
    textAlign:"center"
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '12px 15px',
    textAlign: 'left',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default MyAttendance;
