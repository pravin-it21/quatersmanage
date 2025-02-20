import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageBooking.css'; // Ensure CSS is imported

function ManageBooking(props) {
  const [requestDetails, setRequestDetails] = useState("");
  const [facultyBookings, setFacultyBookings] = useState([]);

  // Function to fetch bookings for this faculty user
  const fetchBookings = () => {
    if (props.user?.userid) {
      axios
        .get(`http://localhost:8082/faculty-bookings/${props.user.userid}`)
        .then((response) => {
          console.log("API Call Success: Bookings Data:", response.data);
          setFacultyBookings(response.data);
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with user ID:", props.user?.userid);
    fetchBookings();
  }, [props.user?.userid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userid: props.user?.userid || '',
      faculty_name: props.user?.fname || '',
      faculty_id: props.user?.faculty_id || props.user?.userid || '', // adjust as needed
      department: 'IT', // Replace with dynamic data if available
      faculty_level: 'Assistant Professor', // Example value
      years_at_BIT: 3, // Example value
      family_members: 4, // Example value
      quarters_type: 'Type A', // Example value
      contact_no: '9876543210', // Example value
      email_id: props.user?.email || '',
      request: requestDetails,  // Note: Using "request" to match DB field
    };

    try {
      const response = await fetch("http://localhost:8082/faculty-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert("Booking request submitted successfully!");
        setRequestDetails(""); // Clear form input
        fetchBookings(); // Refresh booking list
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting booking request:", error);
    }
  };

  return (
    <div className="manage-booking-container">
      
     

      <h3>Your Booking Requests</h3>
      <div className="booking-list">
        {facultyBookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          facultyBookings.map((booking) => (
            <div className="booking-card" key={booking.bookingId}>
              <h4>Booking ID: {booking.bookingId}</h4>
              <p><strong>Faculty Name:</strong> {booking.faculty_name}</p>
              <p><strong>Faculty ID:</strong> {booking.faculty_id}</p>
              <p><strong>Department:</strong> {booking.department}</p>
              <p><strong>Faculty Level:</strong> {booking.faculty_level}</p>
              <p><strong>Years at BIT:</strong> {booking.years_at_BIT}</p>
              <p><strong>Family Members:</strong> {booking.family_members}</p>
              <p><strong>Quarters Type:</strong> {booking.quarters_type}</p>
              <p><strong>Contact No:</strong> {booking.contact_no}</p>
              <p><strong>Email ID:</strong> {booking.email_id}</p>
              <p><strong>Request:</strong> {booking.request}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              {booking.status === "Approved" && (
                <p><strong>Assigned Quarter:</strong> {booking.assignedQuarter}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageBooking;
