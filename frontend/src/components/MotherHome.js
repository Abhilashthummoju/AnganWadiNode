// components/MotherHome.js
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const MotherHome = () => {
  const navigate = useNavigate();

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
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

  const logoutButtonStyle = {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const handleLogout = () => {
    // Logic for logout (e.g., clearing auth tokens, redirecting to login page)
    navigate('/');
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <nav style={navStyle}>
        <Link to="/mother/nutritions" style={linkStyle}>Nutritions</Link>
        <Link to="/mother/timetable" style={linkStyle}>TimeTable</Link>
        <Link to="/mother/profile" style={linkStyle}>Profile</Link>
        <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
      </nav>
      <div style={{ padding: '20px', margin: '10px', borderRadius: '8px', background: '#f8f9fa', height: '100vh' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MotherHome;
