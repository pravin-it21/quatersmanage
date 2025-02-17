import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from './Header';

// Function to handle the registration API call
async function registerUser(credentials) {
  return fetch('http://localhost:8082/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

function Register(props) {
  const history = useHistory();

  // State variables to capture user input
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [role, setRole] = useState('Faculty'); // Default role is 'tenant'

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Send the captured form data to the backend
    const res = await registerUser({
      firstName,
      lastName,
      username,
      password,
      mobile,
      role
    });

    console.log("Registration response ->", res);

    // If registration is successful, redirect to login page
    if (res.status === 'success') {
      alert("Registration successful!");
      history.push("/login");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ width: "400px", margin: "auto", marginTop: "100px" }}>
        <form onSubmit={handleSubmit}>
          <h3>Register</h3><br />

          {/* First Name */}
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              onChange={e => setFirstName(e.target.value)}
              className="form-control"
              placeholder="Enter first name"
              required
            />
          </div><br />

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              onChange={e => setLastName(e.target.value)}
              className="form-control"
              placeholder="Enter last name"
              required
            />
          </div><br />

          {/* Username */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              onChange={e => setUserName(e.target.value)}
              className="form-control"
              placeholder="Enter username"
              required
            />
          </div><br />

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div><br />

          {/* Mobile Number */}
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              onChange={e => setMobile(e.target.value)}
              className="form-control"
              placeholder="Enter mobile number"
              required
            />
          </div><br />

          {/* Role */}
          <div className="form-group">
            <label>Role</label>
            <select
              className="form-control"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            >
              <option value="faculty">Faculty</option>
              <option value="housekeeping">Housekeeping</option>
              <option value="admin">Admin</option>
            </select>
          </div><br />

          {/* Submit Button */}
          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Register
          </button>
          <p className="forgot-password text-right" style={{ paddingTop: "10px" }}>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
