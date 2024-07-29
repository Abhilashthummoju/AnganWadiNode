import React, { useState, useEffect } from 'react';

const PolioDetails = () => {
  const [polioData, setPolioData] = useState([]);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchPolioData();
    fetchChildren();
  }, []);

  const fetchPolioData = async () => {
    try {
      const response = await fetch('http://localhost:8000/polio');
      const data = await response.json();
      setPolioData(data);
    } catch (error) {
      console.error('Error fetching polio data:', error);
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await fetch('http://localhost:8000/children');
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children data:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:8000/polio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ childId: selectedChild, date }),
      });
      if (!response.ok) {
        throw new Error('Error adding polio entry');
      }
      fetchPolioData();
      setSelectedChild('');
      setDate('');
    } catch (error) {
      console.error('Error adding polio entry:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/polio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting polio entry');
      }
      fetchPolioData();
    } catch (error) {
      console.error('Error deleting polio entry:', error);
    }
  };

  return (
    <div style={{ padding: '20px', margin: '10px', borderRadius: '8px', background: '#f8f9fa' }}>
      <h2>Polio Details</h2>
      <div style={{ marginBottom: '20px' }}>
        <h4>Add New Entry</h4>
        <select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Select Child</option>
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name} (Age: {child.age})
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleAdd}
          style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Age</th>
            <th style={styles.tableHeader}>Date of Polio</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {polioData.map((entry) => (
            <tr key={entry.id}>
              <td style={styles.tableCell}>{entry.name}</td>
              <td style={styles.tableCell}>{entry.age}</td>
              <td style={styles.tableCell}>{entry.date}</td>
              <td style={styles.tableCell}>
                <button
                  onClick={() => handleDelete(entry.id)}
                  style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableHeader: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
};

export default PolioDetails;
