import React, { useState } from "react";
import Header from "./Header";

function QuartersBooking(props) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:8082/faculty-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: props.user.userid,
        faculty_name: facultyName,
        faculty_id: facultyId,
        department,
        faculty_level: facultyLevel,
        years_at_BIT: yearsAtBIT,
        family_members: familyMembers,
        quarters_type: quartersType,
        contact_no: contactNo,
        email_id: emailId,
        request
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
    <div>
      <Header />
      <div style={{ width: "400px", margin: "auto", marginTop: "50px" }}>
        <h3>Faculty Quarters Booking</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Faculty Name</label>
            <input type="text" className="form-control" placeholder="Enter faculty name" onChange={(e) => setFacultyName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Faculty ID</label>
            <input type="text" className="form-control" placeholder="Enter faculty ID" onChange={(e) => setFacultyId(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input type="text" className="form-control" placeholder="Enter department" onChange={(e) => setDepartment(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Faculty Level</label>
            <select className="form-control" onChange={(e) => setFacultyLevel(e.target.value)} required>
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
            <input type="number" className="form-control" placeholder="Enter years at BIT" onChange={(e) => setYearsAtBIT(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Family Members</label>
            <input type="number" className="form-control" placeholder="Enter family members count" onChange={(e) => setFamilyMembers(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Quarters Type</label>
            <select className="form-control" onChange={(e) => setQuartersType(e.target.value)} required>
              <option value="">Select Quarters Type</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contact No</label>
            <input type="text" className="form-control" placeholder="Enter contact number" onChange={(e) => setContactNo(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input type="email" className="form-control" placeholder="Enter email ID" onChange={(e) => setEmailId(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Reason for Booking</label>
            <textarea className="form-control" placeholder="Enter reason for booking" onChange={(e) => setRequest(e.target.value)} required />
          </div>

          <br />
          <button type="submit" className="btn btn-primary btn-lg btn-block">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default QuartersBooking;
