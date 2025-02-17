import React, { useState } from 'react';
import Header from './Header';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('association');
  const [flatno, setFlatno] = useState('');
  const [work, setWork] = useState('');


  // Work descriptions for housekeeping
  const workDescriptions = [
    'Cleaning',
    'Dusting',
    'Washing',
    'Laundary',
    'Miscellaneous'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      username,
      password,
      mobile,
      role,
      flatno: role === 'tenant' ? flatno : null,
      work: role === 'housekeeping' ? work : null,
    };

    try {
      const response = await fetch('http://localhost:8082/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('User registered successfully');
      } else {
        console.log(data.message);
        alert('User registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ width: '400px', margin: 'auto', marginTop: '100px' }}>
        <form onSubmit={handleSubmit}>
          <h3>Create Account</h3><br />

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="form-control"
              placeholder="Enter First Name"
            />
          </div><br />

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="form-control"
              placeholder="Enter Last Name"
            />
          </div><br />

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="form-control"
              placeholder="Enter Username"
            />
          </div><br />

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Password"
            />
          </div><br />

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              className="form-control"
              placeholder="Enter Mobile Number"
            />
          </div><br />

          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="form-control"
            >
              <option value="admin">Admin</option>
              <option value="tenant">Tenant</option>
              <option value="association">Association</option>
              <option value="security">Security</option>
              <option value="housekeeping">Housekeeping</option>
            </select>
          </div><br />

          {role === 'tenant' && (
            <div className="form-group">
              <label>Flat Number</label>
              <input
                type="text"
                value={flatno}
                onChange={e => setFlatno(e.target.value)}
                className="form-control"
                placeholder="Enter Flat Number"
              />
            </div>
          )}

          {role === 'housekeeping' && (
            <div className="form-group">
              <label>Work</label>
              <select
                value={work}
                onChange={e => setWork(e.target.value)}
                className="form-control"
              >
                {workDescriptions.map(description => (
                  <option key={description} value={description}>
                    {description}
                  </option>
                ))}
              </select>
            </div>
          )}

          <br />
          <button type="submit" className="btn btn-dark btn-lg btn-block">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
