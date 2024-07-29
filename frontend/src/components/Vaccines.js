import React, { useEffect, useState } from 'react';

const Vaccines = () => {
  const [vaccines, setVaccines] = useState([]);
  const [requests, setRequests] = useState([]);
//   const [received, setReceived] = useState([]);
  const [newVaccine, setNewVaccine] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:8000/vaccines')
      .then(response => response.json())
      .then(data => setVaccines(data));

    fetch('http://localhost:8000/vaccine-requests')
      .then(response => response.json())
      .then(data => setRequests(data));

    // fetch('http://localhost:8000/vaccines/received')
    //   .then(response => response.json())
    //   .then(data => setReceived(data));
  }, []);

  const handleApprove = (requestId, childId, vaccineId) => {
    fetch(`http://localhost:8000/vaccine-requests/${requestId}/approve`, {
      method: 'PATCH',
    })
      .then(response => {
        if (response.ok) {
          setRequests(requests.filter(request => request.id !== requestId));
          // setReceived([...received, {
          //   childId,
          //   vaccineId,
          //   dateReceived: new Date().toISOString().split('T')[0], // Current date
          // }]);
        } else {
          alert('Failed to approve the request.');
        }
      })
      .catch(() => {
        alert('An error occurred while approving the request.');
      });
  };

  const handleAddVaccine = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/vaccines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVaccine),
    })
      .then(response => response.json())
      .then(data => {
        setVaccines([...vaccines, data]);
        setNewVaccine({ name: '', description: '' }); // Clear the form
      });
  };
console.log("CHILD DATA",requests)
  return (
    <div style={{ padding: '20px', margin: '10px', borderRadius: '8px', background: '#f8f9fa', flex: 1, overflowY: 'auto' }}>
      <h1 style={{ color: '#007bff', marginBottom: '20px' }}>Vaccines Management</h1>

      {/* Add Vaccine Form */}
      <form onSubmit={handleAddVaccine} style={{ marginBottom: '30px' }}>
        <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Add New Vaccine</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Vaccine Name</label>
          <input
            type="text"
            value={newVaccine.name}
            onChange={e => setNewVaccine({ ...newVaccine, name: e.target.value })}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea
            value={newVaccine.description}
            onChange={e => setNewVaccine({ ...newVaccine, description: e.target.value })}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Add Vaccine
        </button>
      </form>

      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Available Vaccines</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {vaccines.map(vaccine => (
          <li key={vaccine.id} style={{ background: '#ffffff', margin: '10px 0', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            {vaccine.name} - {vaccine.description}
          </li>
        ))}
      </ul>

      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginTop: '30px' }}>Vaccine Requests</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead style={{ background: '#007bff', color: '#fff' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Child Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Vaccine</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Request Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.childName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.vaccineName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.requestDate}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.status}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {request.status === 'Pending' && (
                  <button
                    onClick={() => handleApprove(request.id, request.childId, request.vaccineId)}
                    style={{ padding: '5px 10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Vaccines Received</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#007bff', color: '#fff' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Child Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Vaccine</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date Received</th>
          </tr>
        </thead>
        <tbody>
          {received.map(record => (
            <tr key={record.childId + record.vaccineId}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.childName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.vaccineName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.dateReceived}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Vaccines;
