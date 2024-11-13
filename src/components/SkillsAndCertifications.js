// src/components/SkillsAndCertifications.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import the useUser hook to access user context
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import './SkillsAndCertifications.css';

function SkillsAndCertifications() {
  const [skills, setSkills] = useState(['']); // Array to hold skills input
  const [links, setLinks] = useState(['']); // Array to hold portfolio links input
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();
  
  // Fetch user details from UserContext
  const { userDetails, loading } = useUser(); 

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']); // Add an empty string to skills array
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index)); // Remove skill at the specified index
  };

  const handleAddLink = () => {
    setLinks([...links, '']); // Add an empty string to links array
  };

  const handleRemoveLink = (index) => {
    setLinks(links.filter((_, i) => i !== index)); // Remove link at the specified index
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleSave = async () => {
    if (loading) {
      return; // Prevent saving if the user data is still loading
    }

    if (!userDetails) {
      console.log("User not logged in");
      return;
    }

    const db = getFirestore();
    const userEmail = userDetails.email;

    try {
      // Check if the user already exists in the Firestore collection
      const userDocRef = doc(db, 'Skills_And_Education', userEmail);
      const userDocSnap = await getDoc(userDocRef);

      const skillsData = {
        skills,
        links,
        resumeFile: resumeFile ? resumeFile.name : null, // Save only the file name, not the file itself
      };

      if (userDocSnap.exists()) {
        // If the document exists, update it
        await updateDoc(userDocRef, skillsData);
        console.log("User's skills and portfolio updated in Firestore.");
      } else {
        // If the document does not exist, create it
        await setDoc(userDocRef, {
          userEmail,
          ...skillsData
        });
        console.log("New user skills and portfolio added to Firestore.");
      }

      // Navigate to the Profile screen after saving
      navigate('/profile');
    } catch (error) {
      console.error("Error saving skills and certifications:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  return (
    <div className="skills-certifications-container">
      <h1>Add skills</h1>
      <p>We recommend adding at least 2 skills</p>
      
      {skills.map((skill, index) => (
        <div className="input-group" key={index}>
          <input
            type="text"
            placeholder="Type a skill"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
          {index === 0 ? (
            <button type="button" className="add-button" onClick={handleAddSkill}>+</button>
          ) : (
            <button type="button" className="remove-button" onClick={() => handleRemoveSkill(index)}>-</button>
          )}
        </div>
      ))}

      <h2>Portfolio (Optional)</h2>
      {links.map((link, index) => (
        <div className="input-group" key={index}>
          <input
            type="text"
            placeholder="Add a link"
            value={link}
            onChange={(e) => handleLinkChange(index, e.target.value)}
          />
          {index === 0 ? (
            <button type="button" className="add-button" onClick={handleAddLink}>+</button>
          ) : (
            <button type="button" className="remove-button" onClick={() => handleRemoveLink(index)}>-</button>
          )}
        </div>
      ))}

      {/* Upload CV Section */}
      <h2>Upload Resume</h2>
      <div className="input-group">
        <label htmlFor="resume-upload" className="upload-cv-box">
          <div className="upload-icon">
            📤
          </div>
          {resumeFile ? resumeFile.name : 'Upload File'}
        </label>
        <input
          type="file"
          id="resume-upload"
          accept=".pdf, .jpg, .jpeg, .png"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      <button className="continue-button" onClick={handleSave}>Save</button>
    </div>
  );
}

export default SkillsAndCertifications;
