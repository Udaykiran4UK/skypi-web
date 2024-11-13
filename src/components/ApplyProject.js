import React, { useState } from "react";
import "./ApplyProject.css";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebaseConfig"; // Import Firestore config
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

function ApplyProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    projectTitle = "",
    email = "",
    phoneNumber = "",
    skillsNeeded = [],
    rolesAvailable = [],
  } = location.state || {};

  // State for form fields
  const [name, setName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]); // Log the uploaded file
  };

  const handleApply = async () => {
    try {
      // Add form data to Firestore
      await addDoc(collection(db, "your_project_responses"), {
        applicantName: name,
        projectTitle,
        applicantEmail,
        receiverEmail: email,
        receiverPhoneNumber: phoneNumber,
        skill: selectedSkill,
        role: selectedRole,
        portfolioUrl,
        appliedDate: new Date(), // Optional: Add timestamp
      });
      
      alert("Application submitted successfully!");
      navigate("/"); // Navigate to home or a confirmation page
    } catch (error) {
      console.error("Error submitting application: ", error);
      alert("Error submitting application. Please try again.");
    }
  };

  return (
    <div className="apply-project">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅
        </button>
        <h2>Apply For Role</h2>
      </div>
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Name of the Project</label>
          <input type="text" value={projectTitle} readOnly />

          <label>Your Email Address</label>
          <input
            type="email"
            placeholder="Your Email Address"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
          />

          <label>Upload CV</label>
          <div className="file-upload">
            <input type="file" onChange={handleFileUpload} />
            <span>Upload File</span>
          </div>

          <label>Receiver Email</label>
          <input type="email" value={email} readOnly />

          <label>Receiver Phone Number</label>
          <input type="tel" value={phoneNumber} readOnly />

          <label>Your Skills</label>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">Choose your skills</option>
            {skillsNeeded.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <label>Your Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Choose your role</option>
            {rolesAvailable.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>

          <label>Portfolio URL</label>
          <input
            type="url"
            placeholder="Portfolio URL"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
          />

          <button type="button" className="apply-button" onClick={handleApply}>
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyProject;
