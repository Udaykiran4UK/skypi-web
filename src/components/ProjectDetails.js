import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProjectDetails.css";

function ProjectDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state || {}; // Access project data from state
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState("requirements");

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited); // Toggle favorite state
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Switch between Requirements and About tab
  };

  const handleApplyNow = () => {
    navigate("/apply", {
      state: {
        projectTitle: project.projectTitle,
        email: project.email,
        phoneNumber: project.phoneNumber,
        skillsNeeded: project.skillsNeeded,
        rolesAvailable: project.rolesAvailable,
      },
    });
  };

  return (
    <div className="project-details">
      <header className="project-details-header">
        
      </header>
      <div className="project-details-content">
        <div className="scroll-container">
          <div className="company-logo">
            <img src={project.logoUrl || "https://via.placeholder.com/80"} alt="Company Logo" />
          </div>
          <h2 className="job-title">{project.projectTitle || "Project Title"}</h2>

          <div className="tabs">
            <button
              className={`tab ${activeTab === "requirements" ? "active" : ""}`}
              onClick={() => handleTabChange("requirements")}
            >
              Requirements
            </button>
            <button
              className={`tab ${activeTab === "about" ? "active" : ""}`}
              onClick={() => handleTabChange("about")}
            >
              About
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "requirements" ? (
              <div className="requirements-section">
                <h3>Work Type:</h3>
                <p>{project.workType}</p>
                
                <h3>Skills Needed:</h3>
                <ul>
                  {(Array.isArray(project.skillsNeeded) ? project.skillsNeeded : []).map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>

                <h3>Roles Available:</h3>
                <ul>
                  {(Array.isArray(project.rolesAvailable) ? project.rolesAvailable : []).map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>

                <h3>Benefits:</h3>
                <ul>
                  {(Array.isArray(project.benefits) ? project.benefits : [project.benefits]).map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="about-section">
                <h3>Company Details:</h3>
                <p>{project.companyDetails}</p>
                
                <h3>Project Description:</h3>
                <p>{project.projectDescription}</p>
                
                <h3>Project Duration:</h3>
                <p>📅: {project.projectDuration}</p>
                
                <h3>City:</h3>
                <p>📍: {project.city}</p>
                
                <h3>Contact Details:</h3>
                <p>
                  Email: {project.email} <br />
                  Phone: {project.phoneNumber}
                </p>
              </div>
            )}
          </div>

          <button className="apply-button" onClick={handleApplyNow}>
            Apply Now ⟹
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
