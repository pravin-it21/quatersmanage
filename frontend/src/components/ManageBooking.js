import React, { useState } from 'react';
import axios from 'axios';
import './ManageBooking.css';  // Ensure that the CSS file is imported

function ManageBooking(props) {
  const [requestDetails, setRequestDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8082/faculty-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        faculty_id: props.user.userid,
        request_details: requestDetails,
      }),
    });

    const data = await response.json();
    if (data.status === "success") {
      alert("Booking request submitted successfully!");
    } else {
      alert("Failed to submit request.");
    }
  };

  return (
    <div className="manage-booking-container">
      <h2 className="heading">Request Faculty Booking</h2>
      <form onSubmit={handleSubmit} className="manage-booking-form">
        <div className="form-group">
          <label htmlFor="request-details">Booking Details</label>
          <textarea
            id="request-details"
            className="form-control"
            rows="4"
            value={requestDetails}
            onChange={(e) => setRequestDetails(e.target.value)}
            placeholder="Enter your booking request details here..."
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default ManageBooking;
