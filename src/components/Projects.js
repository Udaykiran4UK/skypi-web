// src/components/Projects.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

function Projects() {
    const navigate = useNavigate();

    const handleApplyClick = () => {
        navigate('/project-details'); // Navigate to ProjectDetails screen
    };

    return (
        <div className="projects">
            {/* Header */}
            <header className="projects-header">
                <h2>Projects</h2>
            </header>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Find Projects..." />
                <button className="filter-icon">⚙️</button>
            </div>

            {/* Job Card */}
            <div className="job-card">
                <div className="job-info">
                    <img src="https://via.placeholder.com/40" alt="Company Logo" className="company-logo" />
                    <div>
                        <h4>UX Writer Intern</h4>
                        <p>Slack</p>
                    </div>
                </div>
                <div className="job-location">
                    <span role="img" aria-label="location">📍</span> Silicon Valley
                </div>
                <div className="job-duration">
                    <span role="img" aria-label="calendar">📅</span> 6 Months
                </div>
                <button className="apply-button" onClick={handleApplyClick}>Details</button> {/* onClick handler */}
            
            </div>
        </div>
    );
}

export default Projects;
