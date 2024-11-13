import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./HomeScreen.css";

function HomeScreen() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectCollection = collection(db, "posted_projects");
      const projectSnapshot = await getDocs(projectCollection);
      const projectList = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);
    };

    fetchProjects();
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleProjectDetailsClick = (project) => {
    navigate("/project-details", { state: project }); // Pass project data as state
  };

  const handleSeeAllClick = () => {
    navigate("/projects");
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("Swiped left"),
    onSwipedRight: () => console.log("Swiped right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="home-screen">
      <header className="home-header">
        <div className="profile-section" onClick={handleProfileClick}>
          <img src="https://via.placeholder.com/40" alt="Profile" className="profile-icon" />
          <div className="greeting">
            <p>Hi,</p>
            <h2>Uday Kiran</h2>
          </div>
        </div>
      </header>

      <div className="search-bar">
        <input type="text" placeholder="Find Projects..." />
      </div>

      <div className="event-promotion">
        <div className="event-details">
          <p>Career Conference</p>
          <h4>Treat yourself with knowledge</h4>
          <button className="join-event">Join Event</button>
        </div>
        <img
          src="https://via.placeholder.com/100"
          alt="Event"
          className="event-image"
        />
      </div>

      <section className="actively-hiring">
        <h4>Actively Hiring</h4>
       
        <div className="job-cards" {...handlers}>
          {projects.map((project) => (
            <div className="job-card" key={project.id} onClick={() => handleProjectDetailsClick(project)}>
              <img
                src={project.logoUrl || "https://via.placeholder.com/40"}
                alt={`${project.projectTitle} Logo`}
                className="company-logo"
              />
              <div className="job-card-content">
                <h5>{project.projectTitle}</h5>
                <p>{project.workType}</p>
                <p>📍 {project.city}</p>
                <p>⏳ {project.projectDuration}</p>
                <p>📅 {new Date(project.postedDate?.toDate()).toLocaleDateString()}</p>
                <button className="apply-button">Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
