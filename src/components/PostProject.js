import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import './PostProject.css';

function PostProject() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(['React', 'Node.js', 'UI/UX Design', 'DevOps', 'Python']);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [roles, setRoles] = useState(['Frontend Developer', 'Backend Developer', 'UI Designer', 'Server Manager']);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [workType, setWorkType] = useState('');
  const [showCityPopup, setShowCityPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [customCity, setCustomCity] = useState('');
  const predefinedCities = ['Hyderabad', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai'];
  const [companyLogo, setCompanyLogo] = useState(null);
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    projectDuration: '1 month',
    companyDetails: '',
    benefits: '',
    email: '',
    phoneNumber: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // For showing success dialog

  const handleSkillClick = (skill) => {
    setSelectedSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  };

  const handleRoleClick = (role) => {
    setSelectedRoles((prev) => prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]);
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setSelectedSkills([...selectedSkills, newSkill]);
      setNewSkill('');
      setShowAddSkill(false);
    }
  };

  const handleAddRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setSelectedRoles([...selectedRoles, newRole]);
      setNewRole('');
      setShowAddRole(false);
    }
  };

  const handleWorkTypeChange = (e) => {
    const value = e.target.value;
    setWorkType(value);
    setShowCityPopup(value === 'On-site');
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityPopup(false);
  };

  const handleAddCustomCity = () => {
    if (customCity) {
      setSelectedCity(customCity);
      setCustomCity('');
      setShowCityPopup(false);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyLogo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let logoURL = '';
      
      // Upload the logo to Firebase Storage if it exists
      
      

      // Save data to Firestore
      await addDoc(collection(db, 'posted_projects'), {
        ...formData,
        skillsNeeded: selectedSkills,
        rolesAvailable: selectedRoles,
        workType,
        city: selectedCity || null,
        logoURL,
        postedDate: serverTimestamp()
      });

      setShowSuccessPopup(true); // Show success popup
    } catch (error) {
      console.error('Error posting project:', error);
      alert('Failed to post project.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="post-project-container">
      <header className="post-project-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h2>Post a New Project</h2>
      </header>

      <form className="post-project-form" onSubmit={handleSubmit}>
        <label>
          Project Title
          <input type="text" name="projectTitle" placeholder="Project Title" required onChange={handleInputChange} />
        </label>

        <label>
          Project Description
          <textarea name="projectDescription" placeholder="Project Description" rows="6" required onChange={handleInputChange}></textarea>
        </label>

        <label>
          Project Duration
          <select name="projectDuration" onChange={handleInputChange}>
            <option>1 month</option>
            <option>2 months</option>
            <option>3 months</option>
            <option>6 months</option>
            <option>12 months</option>
          </select>
        </label>

        <div className="skills-section">
          <label>Skills Needed</label>
          <div className="skills-list">
            {skills.map((skill) => (
              <button
                type="button"
                key={skill}
                className={selectedSkills.includes(skill) ? 'selected' : ''}
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
              </button>
            ))}
            <button type="button" className="add-button" onClick={() => setShowAddSkill(true)}>+</button>
          </div>
        </div>

        <div className="roles-section">
          <label>Roles Available</label>
          <div className="roles-list">
            {roles.map((role) => (
              <button
                type="button"
                key={role}
                className={selectedRoles.includes(role) ? 'selected' : ''}
                onClick={() => handleRoleClick(role)}
              >
                {role}
              </button>
            ))}
            <button type="button" className="add-button" onClick={() => setShowAddRole(true)}>+</button>
          </div>
        </div>

        <label>
          Company Details
          <textarea name="companyDetails" placeholder="Company or Self..." rows="6" required onChange={handleInputChange}></textarea>
        </label>

        <label>
          Upload Company Logo
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </label>
        {companyLogo && <img src={URL.createObjectURL(companyLogo)} alt="Company Logo" className="company-logo-preview" />}

        <label>
          Benefits
          <textarea name="benefits" placeholder="If I work for you..." rows="6" required onChange={handleInputChange}></textarea>
        </label>

        <label>
          Email
          <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
        </label>

        <label>
          Phone Number
          <input type="tel" name="phoneNumber" placeholder="Phone Number" required onChange={handleInputChange} />
        </label>

        <label>
          Work Type
          <select name="workType" value={workType} onChange={handleWorkTypeChange}>
            <option value="Work from Home">Work from Home</option>
            <option value="On-site">On-site</option>
          </select>
        </label>

        {selectedCity && <p>Selected City: {selectedCity}</p>}

        <button type="submit" className="post-project-button">Post Project</button>
      </form>

      {showAddSkill && (
        <div className="popup">
          <h3>Add New Skill</h3>
          <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Enter skill" />
          <button onClick={handleAddSkill}>Add</button>
          <button onClick={() => setShowAddSkill(false)}>Cancel</button>
        </div>
      )}

      {showAddRole && (
        <div className="popup">
          <h3>Add New Role</h3>
          <input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="Enter role" />
          <button onClick={handleAddRole}>Add</button>
          <button onClick={() => setShowAddRole(false)}>Cancel</button>
        </div>
      )}

      {showCityPopup && (
        <div className="popup">
          <h3>Select a City</h3>
          {predefinedCities.map((city) => (
            <button key={city} onClick={() => handleCitySelect(city)}>
              {city}
            </button>
          ))}
          <input
            type="text"
            value={customCity}
            onChange={(e) => setCustomCity(e.target.value)}
            placeholder="Enter custom city"
          />
          <button onClick={handleAddCustomCity}>Add Custom City</button>
          <button onClick={() => setShowCityPopup(false)}>Cancel</button>
        </div>
      )}

      {showSuccessPopup && (
        <div className="popup">
          <h3>Project Posted Successfully!</h3>
          <button onClick={() => { setShowSuccessPopup(false); navigate(-1); }}>Close</button>
        </div>
      )}
    </div>
  );
}

export default PostProject;
