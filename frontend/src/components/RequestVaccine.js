// components/RequestVaccine.js
import React, { useEffect, useState } from 'react';

const RequestVaccine = () => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    console.log("HEY")
    fetch('http://localhost:8000/vaccines')
      .then(response => response.json())
      .then(data => setVaccines(data));
      console.log("HEY22")

  }, []);

  const handleRequest = (vaccineId) => {
    const childId = JSON.parse(localStorage.getItem("childId"))
    console.log("ABHI",childId)
    fetch('http://localhost:8000/vaccine-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Example token header
      },
      body: JSON.stringify({
        vaccineId,
        childId,
        requestDate: new Date().toISOString().split('T')[0], // Current date
      }),
    })
      .then(response => response.json())
      .then(() => {
        alert('Vaccine request submitted!');
      });
  };

  return (
    <div style={{ padding: '20px', margin: '10px', borderRadius: '8px', background: '#f8f9fa' }}>
      <h1 style={{ color: '#007bff' }}>Request Vaccine</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {vaccines.map(vaccine => (
          <li key={vaccine.id} style={{ background: '#ffffff', margin: '10px 0', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{vaccine.name} - {vaccine.description}</span>
            <button
              onClick={() => handleRequest(vaccine.id)}
              style={{ padding: '5px 10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Request
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestVaccine;
