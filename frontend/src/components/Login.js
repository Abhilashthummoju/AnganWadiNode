import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const formStyle = {
    width: '450px',
    margin: 'auto',
    background: '#ffffff',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    padding: '40px 55px 45px 55px',
    borderRadius: '15px',
    transition: 'all .3s',
  };

  const h3Style = {
    textAlign: 'center',
    margin: 0,
    lineHeight: '1',
    paddingBottom: '20px',
    fontFamily: "'Fira Sans', sans-serif",
    fontWeight: 500,
  };

  const mb3Style = {
    marginBottom: '1rem',
  };

  const formControlStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const customControlStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const customControlInputStyle = {
    marginRight: '0.5rem',
  };

  const customControlLabelStyle = {
    fontWeight: 400,
  };

  const btnPrimaryStyle = {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
  };

  const forgotPasswordStyle = {
    textAlign: 'right',
    marginTop: '10px',
    fontSize: '13px',
    color: '#7f7d7d',
    margin: 0,
  };

  const forgotPasswordLinkStyle = {
    color: '#167bff',
    textDecoration: 'none',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/${type}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An unexpected error occurred');
      }
      if (data.id) {
        localStorage.setItem("childId", JSON.stringify(data.id));
      }
      console.log("LOGIN RESPONSE", data);
      // Navigate to respective home pages on successful login
      if (type === 'admin') {
        navigate('/admin');
      } else if (type === 'children') {
        navigate('/children');
      } else if (type === 'mother') {
        navigate('/mother');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px' }}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h3 style={h3Style}>Sign In as {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <div style={mb3Style}>
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            style={formControlStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={mb3Style}>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            style={formControlStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={mb3Style}>
          <div style={customControlStyle}>
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              style={customControlInputStyle}
            />
            <label className="custom-control-label" htmlFor="customCheck1" style={customControlLabelStyle}>
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" style={btnPrimaryStyle}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right" style={forgotPasswordStyle}>
          Forgot <a href="#" style={forgotPasswordLinkStyle}>password?</a>
        </p>
        <p className="forgot-password text-right" style={forgotPasswordStyle}>
          Don't have an account? <Link to={`/signup/${type}`} style={forgotPasswordLinkStyle}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
