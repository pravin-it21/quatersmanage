import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

function QuartersBooking(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  
  // Form state for all fields
  const [facultyName, setFacultyName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [department, setDepartment] = useState("");
  const [facultyLevel, setFacultyLevel] = useState("");
  const [yearsAtBIT, setYearsAtBIT] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");
  const [quartersType, setQuartersType] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [request, setRequest] = useState("");

  // When component mounts, check if a non-rejected booking request exists for this user
  useEffect(() => {
    async function checkBooking() {
      try {
        const response = await fetch(`http://localhost:8082/faculty-bookings/${props.user.userid}`);
        const data = await response.json();
        console.log("API Call Success: Bookings Data:", data);
        // Look for any booking that is not rejected
        const activeBooking = data.find(
          (b) => b.status === "Pending" || b.status === "Approved"
        );
        if (activeBooking) {
          // If an active booking exists, redirect to ManageBooking page
          history.push("/dashboard/manage-booking");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking booking:", error);
        setLoading(false);
      }
    }
    if (props.user?.userid) {
      checkBooking();
    } else {
      console.log("No user ID found.");
      setLoading(false);
    }
  }, [props.user, props.user.userid, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userid: props.user.userid,
      faculty_name: facultyName,
      faculty_id: facultyId,
      department: department,
      faculty_level: facultyLevel,
      years_at_BIT: yearsAtBIT,
      family_members: familyMembers,
      quarters_type: quartersType,
      contact_no: contactNo,
      email_id: emailId,
      request: request,
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
        // After submission, redirect to ManageBooking page
        history.push("/dashboard/manage-booking");
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting booking request:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div style={{ width: "400px", margin: "auto", marginTop: "50px" }}>
        <h3>Faculty Quarters Booking</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Faculty Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter faculty name"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Faculty ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter faculty ID"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Faculty Level</label>
            <select
              className="form-control"
              value={facultyLevel}
              onChange={(e) => setFacultyLevel(e.target.value)}
              required
            >
              <option value="">Select Faculty Level</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Assistant Professor Level 2">Assistant Professor Level 2</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Professor">Professor</option>
              <option value="HOD">HOD</option>
            </select>
          </div>

          <div className="form-group">
            <label>Years at BIT</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter years at BIT"
              value={yearsAtBIT}
              onChange={(e) => setYearsAtBIT(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Family Members</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter family members count"
              value={familyMembers}
              onChange={(e) => setFamilyMembers(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Quarters Type</label>
            <select
              className="form-control"
              value={quartersType}
              onChange={(e) => setQuartersType(e.target.value)}
              required
            >
              <option value="">Select Quarters Type</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contact No</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter contact number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email ID"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Reason for Booking</label>
            <textarea
              className="form-control"
              placeholder="Enter reason for booking"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              required
            />
          </div>

          <br />
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuartersBooking;
