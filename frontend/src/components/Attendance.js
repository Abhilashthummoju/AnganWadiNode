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
    height: '100%',
  };

  const headerStyle = {
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  };

  const tableHeaderStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '10px',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}> Children Attendance</h2>
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px',marginBottom:"10px" }}
        />
      </label>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {children.map(child => (
            <tr key={child.id}>
              <td style={tableCellStyle}>{child.name}</td>
              <td style={tableCellStyle}>
                <select
                  value={attendance[child.id] || 'Absent'}
                  onChange={(e) => handleStatusChange(child.id, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={buttonStyle}
        onClick={submitAttendance}
        disabled={submitting} // Disable button during submission
      >
        {submitting ? 'Submitting...' : 'Submit Attendance'}
      </button>

      <h3 style={headerStyle}>Previous Attendance Records</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {previousAttendance.map((record, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{record.childName}</td>
              <td style={tableCellStyle}>{record.date}</td>
              <td style={tableCellStyle}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
