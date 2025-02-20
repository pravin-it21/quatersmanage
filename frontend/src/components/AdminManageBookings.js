import React, { useEffect, useState } from "react";
import axios from "axios";
import './ManageBooking.css'; // Ensure CSS is imported

const AdminManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  // Store admin comments per booking (using booking_id as key)
  const [comments, setComments] = useState({});

  // Fetch all booking requests on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8082/faculty-bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleApproval = (bookingId, status) => {
    // Use the comment entered for this booking as the assignedQuarter value.
    const adminComment = comments[bookingId] || "";
    axios
      .post("http://localhost:8082/faculty-booking/approve", {
        bookingId,
        status,
        assignedQuarter: adminComment,
        adminComments: status === "Approved" ? "Approved by Admin" : "Rejected by Admin",
      })
      .then((response) => {
        if (response.data.status === "success") {
          alert("Booking status updated successfully!");
          // Refresh booking list after status update
          axios
            .get("http://localhost:8082/faculty-bookings")
            .then((res) => setBookings(res.data))
            .catch((error) => console.error("Error refreshing bookings:", error));
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
            <div className="booking-card" key={booking.booking_id}>
              <h4>Booking ID: {booking.booking_id}</h4>
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
              {booking.status === "Approved" && booking.assignedQuarter && (
                <p><strong>Assigned Quarter:</strong> {booking.assignedQuarter}</p>
              )}
              {/* Only allow comments if the booking is still pending */}
              {booking.status === "Pending" && (
                <>
                  <div className="admin-comment">
                    <label>Admin Comment / Assigned Quarter:</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Enter comment or assigned quarter details..."
                      value={comments[booking.booking_id] || ""}
                      onChange={(e) =>
                        setComments({
                          ...comments,
                          [booking.booking_id]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="buttons">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApproval(booking.booking_id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleApproval(booking.booking_id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminManageBookings;
