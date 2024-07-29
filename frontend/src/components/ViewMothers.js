import React, { useEffect, useState } from 'react';

const ViewMothers = () => {
  const [mothers, setMothers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMothers = async () => {
      try {
        const response = await fetch('http://localhost:8000/mothers');
        if (!response.ok) {
          throw new Error('Failed to fetch mothers data');
        }
        const data = await response.json();
        setMothers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMothers();
  }, []);

  const pageStyle = {
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    background: '#f8f9fa',
    height: '100%',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const tableHeaderStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  };

  const tableRowStyle = {
    borderBottom: '1px solid #ddd',
  };

  const tableCellStyle = {
    padding: '10px',
  };

  return (
    <div style={pageStyle}>
      <h2>Mothers Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableCellStyle}>First Name</th>
              <th style={tableCellStyle}>Last Name</th>
              <th style={tableCellStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {mothers.map((mother) => (
              <tr key={mother.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{mother.firstName}</td>
                <td style={tableCellStyle}>{mother.lastName}</td>
                <td style={tableCellStyle}>{mother.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewMothers;
