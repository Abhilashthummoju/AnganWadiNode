import React, { useEffect, useState } from 'react';

const Nutrition = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await fetch('http://localhost:8000/nutrition');
        if (!response.ok) {
          throw new Error('Failed to fetch nutrition data');
        }
        const data = await response.json();
        setNutritionData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
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
      <h2>Nutritions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableCellStyle}>S. No.</th>
              <th style={tableCellStyle}>Categories</th>
              <th style={tableCellStyle}>Types of Food</th>
              <th style={tableCellStyle}>Energy</th>
              <th style={tableCellStyle}>Protein</th>
            </tr>
          </thead>
          <tbody>
            {nutritionData.map((item) => (
              <tr key={item.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{item.id}</td>
                <td style={tableCellStyle}>{item.category}</td>
                <td style={tableCellStyle}>{item.foodType}</td>
                <td style={tableCellStyle}>{item.energy}</td>
                <td style={tableCellStyle}>{item.protein}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Nutrition;
