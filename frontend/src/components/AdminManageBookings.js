import React, { useEffect, useState } from "react";
import axios from "axios";
import './ManageBooking.css'; // Ensure CSS is imported

const AdminManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings
    axios
      .get("http://localhost:8082/faculty-bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleApproval = (bookingId, status) => {
    // Approve or reject booking
    axios
      .post("http://localhost:8082/faculty-booking/approve", {
        bookingId,
        status,
        assignedQuarter: "BHK 2BHK", // Example value for assigned quarter
        adminComments: "Approved by Admin", // Example comment
      })
      .then((response) => {
        if (response.data.status === "success") {
          alert("Booking status updated successfully!");
        }
      })
      .catch((error) => console.error("Error approving booking:", error));
  };

  return (
    <div className="manage-booking-container">
      <h3 className="heading">Manage Faculty Bookings</h3>
      {bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.bookingId}>
              <h4>Booking ID: {booking.bookingId}</h4>
              <p><strong>Faculty Name:</strong> {booking.faculty_name}</p>
              <p><strong>Request:</strong> {booking.request}</p>
              <div className="buttons">
                <button
                  className="btn btn-success"
                  onClick={() => handleApproval(booking.bookingId, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleApproval(booking.bookingId, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminManageBookings;
