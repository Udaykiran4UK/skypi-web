// src/components/MyProjects.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '../context/UserContext'; // Import useUser hook from UserContext
import './MyProjects.css';

function MyProjects() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userDetails } = useUser(); // Access user details from context
  const email = userDetails?.email || "Email not available";

  // Fetch user's projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getFirestore();
        const projectsRef = collection(db, 'posted_projects');
        const q = query(projectsRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email !== "Email not available") {
      fetchProjects();
    }
  }, [email]);

  const handleAddButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handlePostProject = () => {
    setIsDialogOpen(false);
    navigate('/post-project');
  };

  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      <p className="user-email">User Email: {email}</p>

      {loading ? (
        <div>Loading projects...</div>
      ) : projects.length > 0 ? (
        projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            style={{ backgroundColor: project.color || "#f0f0f0" }}
          >
            <div className="project-header">
              <h2>{project.projectTitle}</h2>
              {project.logo && (
                <img src={project.logo} alt={`${project.projectTitle} logo`} className="project-logo" />
              )}
            </div>
            <p>{project.companyDetails}</p>
            <div className="project-info">
              <div className="project-detail">
                <span role="img" aria-label="location">📍</span>
                {project.city || 'City not specified'}
              </div>
              <div className="project-detail">
                <span role="img" aria-label="stipend">💰</span>
                {project.benefits || 'Benefits not specified'}
              </div>
              <div className="project-detail">
                <span role="img" aria-label="duration">⏳</span>
                {project.projectDuration || 'Duration not specified'}
              </div>
              <div className="project-detail">
                <span role="img" aria-label="roles">📋</span>
                {project.rolesAvailable || 'Roles not specified'}
              </div>
              <div className="project-detail">
                <span role="img" aria-label="skills">🛠</span>
                {project.skillsNeeded || 'Skills not specified'}
              </div>
              <div className="project-detail">
                <span role="img" aria-label="work type">🏢</span>
                {project.workType || 'Work type not specified'}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}

      <button className="floating-add-button" onClick={handleAddButtonClick}>
        <span className="white-plus">+</span>
      </button>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>Do you want to post a new project?</p>
            <button onClick={handlePostProject} className="dialog-button yes">Yes</button>
            <button onClick={handleDialogClose} className="dialog-button no">No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProjects;
