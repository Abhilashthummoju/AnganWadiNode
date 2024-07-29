import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

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
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545', // Bootstrap danger color
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#c82333', // Darker shade for hover
  };

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const pageStyle = {
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    background: '#f8f9fa',
    flex: 1,
    overflowY: 'auto',
  };

  const handleLogout = () => {
    // Clear any authentication tokens or session data here
    localStorage.removeItem('authToken'); // Example token removal

    // Redirect to login page or home page
    navigate('/'); // Adjust the route as needed
  };

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <Link to="/admin/attendance" style={linkStyle}>Children's Attendance</Link>
        <Link to="/admin/nutrition" style={linkStyle}>Nutritions</Link>
        <Link to="/admin/view-children" style={linkStyle}>Children Data</Link>
        <Link to="/admin/view-mothers" style={linkStyle}>Mothers Details</Link>
        <Link to="/admin/polio-details" style={linkStyle}>Polio Details</Link>
        <Link to="/admin/timetable" style={linkStyle}>Time Table</Link>
        <Link to="/admin/child-requests" style={linkStyle}>Child Requests</Link>
        <Link to="/admin/vaccines" style={linkStyle}>Vaccines</Link>
        <button
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <div style={pageStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
