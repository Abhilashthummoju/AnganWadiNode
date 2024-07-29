import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const [children, setChildren] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [previousAttendance, setPreviousAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false); // Track submission status

  useEffect(() => {
    fetchChildren();
    fetchPreviousAttendance();
  }, [selectedDate]);

  const fetchChildren = async () => {
    try {
      const response = await fetch('http://localhost:8000/children');
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  const fetchPreviousAttendance = async () => {
    try {
      const response = await fetch('http://localhost:8000/attendance');
      const data = await response.json();
      console.log("data",data)
      setPreviousAttendance(data);
    } catch (error) {
      console.error('Error fetching previous attendance:', error);
    }
  };

  const handleStatusChange = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const submitAttendance = async () => {
    if (submitting) return; // Prevent duplicate submissions

    setSubmitting(true); // Set submitting to true

    try {
      const requests = Object.entries(attendance).map(([childId, status]) =>
        fetch('http://localhost:8000/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: selectedDate, childId: parseInt(childId), status }),
        })
      );

      await Promise.all(requests);

      // Show success alert only after all requests are successful
      alert('Attendance submitted successfully!');
      fetchPreviousAttendance(); // Refresh previous attendance records
    } catch (error) {
      console.error('Error submitting attendance:', error);
    } finally {
      setSubmitting(false); // Reset submitting status
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const containerStyle = {
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    background: '#f8f9fa',
    minHeight: '100vh',
    overflowY: 'auto',
  };

  const headerStyle = {
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Darker shade for hover
  };

  const statusOptions = ['Present', 'Absent', 'Excused'];

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Attendance</h2>
      <label htmlFor="date">Select Date: </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Child ID</th>
            <th style={thStyle}>Child Name</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child) => (
            <tr key={child.id}>
              <td style={tdStyle}>{child.id}</td>
              <td style={tdStyle}>{child.name}</td>
      
              <td style={tdStyle}>
                <select
                  value={attendance[child.id] || ''}
                  onChange={(e) => handleStatusChange(child.id, e.target.value)}
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={buttonStyle}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        onClick={submitAttendance}
        disabled={submitting} // Disable button during submission
      >
        Submit Attendance
      </button>

      <h2 style={{ marginTop: '40px' }}>Previous Attendance Records</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Child Name</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {previousAttendance.map((record, index) => (
            <tr key={index}>
              <td style={tdStyle}>{record.date}</td>
              <td style={tdStyle}>{record.childName}</td>
              <td style={tdStyle}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
