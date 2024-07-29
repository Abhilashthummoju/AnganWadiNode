// components/ChildrenHome.js
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const ChildrenHome = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  // console.log(JSON.parse(localStorage.getItem('childId')))
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    background: '#007bff',
    color: '#fff',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const handleLogout = () => {
    // Clear any authentication tokens or session data here
    localStorage.removeItem('authToken'); // Example token removal

    // Redirect to login page or home page
    navigate('/'); // Adjust the route as needed
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <nav style={navStyle}>
        <Link to="/children/attendance" style={linkStyle}>View My Attendance</Link>
        <Link to="/children/timetable" style={linkStyle}>TimeTable</Link>
        <Link to="/children/profile" style={linkStyle}>Profile</Link>
        <Link to="/children/request-vaccine" style={linkStyle}>Request Vaccine</Link> {/* New link */}
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      </nav>
      <div style={{ padding: '20px', margin: '10px', borderRadius: '8px', background: '#f8f9fa', height: '100vh' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ChildrenHome;
