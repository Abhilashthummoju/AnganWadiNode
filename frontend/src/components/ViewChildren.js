import React, { useState, useEffect } from 'react';

const ViewChildren = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch('http://localhost:8000/children');
        const data = await response.json();
        setChildren(data);
      } catch (error) {
        console.error('Error fetching children data:', error);
      }
    };

    fetchChildren();
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const headerStyle = {
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    background: '#f8f9fa',
    textAlign: 'center',
  };

  return (
    <div style={{ padding: '20px', margin: '10px', borderRadius: '8px', background: '#f8f9fa' }}>
      <h2 style={headerStyle}>Children Details</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Father's Name</th>
            <th style={thStyle}>Mother's Name</th>
            <th style={thStyle}>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {children.map(child => (
            <tr key={child.id}>
              <td style={tdStyle}>{child.name}</td>
              <td style={tdStyle}>{child.age}</td>
              <td style={tdStyle}>{child.fathersName}</td>
              <td style={tdStyle}>{child.mothersName}</td>
              <td style={tdStyle}>{child.dateOfBirth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewChildren;
