// components/TimeTable.js

import React, { useState, useEffect } from 'react';

const TimeTable = () => {
  const [timetable, setTimetable] = useState([]);
  const [editingDay, setEditingDay] = useState(null);
  const [formData, setFormData] = useState({ breakfast: '', lunch: '', snacks: '' });

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await fetch('http://localhost:8000/timetable');
      const data = await response.json();
      setTimetable(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const handleEdit = (day) => {
    const dayData = timetable.find(item => item.day === day);
    setFormData({ breakfast: dayData.breakfast, lunch: dayData.lunch, snacks: dayData.snacks });
    setEditingDay(day);
  };

  const handleSave = async (day) => {
    try {
      await fetch(`http://localhost:8000/timetable/${day}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      fetchTimetable();
      setEditingDay(null);
    } catch (error) {
      console.error('Error updating timetable:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    background: '#007bff',
    color: 'white',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  const editButtonStyle = {
    marginLeft: '10px',
    padding: '5px 10px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  const saveButtonStyle = {
    padding: '5px 10px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div>
      <h2>TimeTable</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Day</th>
            <th style={thStyle}>Breakfast</th>
            <th style={thStyle}>Lunch</th>
            <th style={thStyle}>Snacks</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((item) => (
            <tr key={item.day}>
              <td style={tdStyle}>{item.day}</td>
              <td style={tdStyle}>
                {editingDay === item.day ? (
                  <input
                    type="text"
                    name="breakfast"
                    value={formData.breakfast}
                    onChange={handleChange}
                  />
                ) : (
                  item.breakfast
                )}
              </td>
              <td style={tdStyle}>
                {editingDay === item.day ? (
                  <input
                    type="text"
                    name="lunch"
                    value={formData.lunch}
                    onChange={handleChange}
                  />
                ) : (
                  item.lunch
                )}
              </td>
              <td style={tdStyle}>
                {editingDay === item.day ? (
                  <input
                    type="text"
                    name="snacks"
                    value={formData.snacks}
                    onChange={handleChange}
                  />
                ) : (
                  item.snacks
                )}
              </td>
              <td style={tdStyle}>
                {editingDay === item.day ? (
                  <button style={saveButtonStyle} onClick={() => handleSave(item.day)}>
                    Save
                  </button>
                ) : (
                  <button style={editButtonStyle} onClick={() => handleEdit(item.day)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
