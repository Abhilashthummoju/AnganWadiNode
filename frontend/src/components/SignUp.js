import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const { type } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [mothersName, setMothersName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = '';
      if (type === 'admin') {
        response = await axios.post('http://localhost:8000/admin/signup/', { first_name: firstName, last_name: lastName, email, password });
      } else if (type === 'children') {
        response = await axios.post('http://localhost:8000/children/register/', { name: firstName, age, fathersName, mothersName, dateOfBirth: dob, email, password });
      } else if (type === 'mother') {
        response = await axios.post('http://localhost:8000/mother/signup/', { firstName, lastName, email, password, phoneNumber, address });
      }

      if (response.status === 201) {
        alert('Signup Successful');
      }
    } catch (error) {
      alert('Error: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
      <form
        style={{
          width: '450px',
          margin: 'auto',
          background: '#ffffff',
          boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
          padding: '40px 55px 45px 55px',
          borderRadius: '15px',
          transition: 'all .3s',
        }}
        onSubmit={handleSubmit}
      >
        <h3
          style={{
            textAlign: 'center',
            margin: 0,
            lineHeight: 1,
            paddingBottom: '20px',
            fontFamily: "'Fira Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          Sign Up as {type.charAt(0).toUpperCase() + type.slice(1)}
        </h3>
        {type !== 'children' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>First Name</label>
              <input
                type="text"
                placeholder="First name"
                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            {type === 'mother' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
          </>
        )}
        {type === 'children' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Child's name"
                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Age</label>
              <input
                type="number"
                placeholder="Age"
                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Father's Name</label>
              <input
                type="text"
                placeholder="Father's name"
                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                value={fathersName}
                onChange={(e) => setFathersName(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Mother's Name</label>
              <input
                type="text"
                placeholder="Mother's name"
                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                value={mothersName}
                onChange={(e) => setMothersName(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Date of Birth</label>
              <input
                type="date"
                placeholder="Date of Birth"
                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div style={{ marginBottom: '1rem' }}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '5px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
