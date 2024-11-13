// src/components/ResumeAndEducation.js

import React, { useState } from 'react';
import './ResumeAndEducation.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Firestore functions
import { useUser } from '../context/UserContext'; // Import the custom hook to get user data

function ResumeAndEducation() {
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore
  const { userDetails, loading } = useUser(); // Get user details and loading state from context

  const [levelOfEducation, setLevelOfEducation] = useState('');
  const [stream, setStream] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null); // State for "From" date
  const [endDate, setEndDate] = useState(null); // State for "To" date

  // Handle the "Continue" button click
  const handleContinueClick = async () => {
    if (loading) return; // Prevent saving if data is still loading

    try {
      if (!userDetails) {
        console.log("User not logged in");
        return;
      }

      // Create the document reference using the user's email as the document ID
      const userEmail = userDetails.email;
      const userDocRef = doc(db, 'Skills_And_Education', userEmail);

      // Education data to be saved in Firestore
      const educationData = {
        levelOfEducation,
        stream,
        collegeName,
        location,
        timePeriod: {
          from: startDate ? startDate.toLocaleDateString('en-CA', { month: '2-digit', year: 'numeric' }) : null,
          to: endDate ? endDate.toLocaleDateString('en-CA', { month: '2-digit', year: 'numeric' }) : null,
        },
        userEmail, // Store the user's email from the context
      };

      // Save or update data in Firestore using setDoc (this will overwrite if the document exists)
      await setDoc(userDocRef, educationData);

      // Navigate to the next page after saving
      navigate('/skills-certifications');
    } catch (error) {
      console.error("Error saving education details:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  return (
    <div className="resume-education-container">
      <header className="resume-education-header">
        <h2>Add Education</h2>
      </header>

      <form className="resume-education-form">
        <label>
          Level of Education
          <input
            type="text"
            placeholder="e.g., B.Tech"
            required
            value={levelOfEducation}
            onChange={(e) => setLevelOfEducation(e.target.value)}
          />
        </label>

        <label>
          Stream
          <input
            type="text"
            placeholder="e.g., Computer Science"
            required
            value={stream}
            onChange={(e) => setStream(e.target.value)}
          />
        </label>

        <label>
          College Name
          <input
            type="text"
            placeholder="College Name"
            required
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
          />
        </label>

        <label>
          City, State
          <input
            type="text"
            placeholder="City, State"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        {/* Time Period Section */}
        <div className="time-period">
          <label>Time Period</label>
          <div className="time-selectors">
            <div className="time-from">
              <label>From</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="Select"
                required
                className="date-picker-input"
                popperPlacement="top" // Opens the calendar above the input
              />
            </div>

            <div className="time-to">
              <label>To</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="Select"
                required
                className="date-picker-input"
                popperPlacement="top" // Opens the calendar above the input
              />
            </div>
          </div>
        </div>

        <button type="button" className="continue-button" onClick={handleContinueClick}>
          Continue
        </button>
      </form>
    </div>
  );
}

export default ResumeAndEducation;
