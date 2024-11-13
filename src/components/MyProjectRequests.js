// src/components/MyProjectRequests.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext"; // Import useUser hook from UserContext
import "./MyProjectRequests.css";

function MyProjectRequests() {
  const navigate = useNavigate();
  const { userDetails } = useUser(); // Access user details from context
  const email = userDetails?.email || "Email not available"; // Get email from userDetails or set a default

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null); // State to hold selected application for dialog
  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility

  // Fetch applications from Firestore where either owner email or receiver email matches
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const db = getFirestore();
        const applicationsRef = collection(db, "your_project_responses");

        // Fetch for ownerEmail
        const ownerQuery = query(applicationsRef, where("ownerEmail", "==", email));
        const receiverQuery = query(applicationsRef, where("receiverEmail", "==", email));

        const [ownerSnapshot, receiverSnapshot] = await Promise.all([
          getDocs(ownerQuery),
          getDocs(receiverQuery),
        ]);

        const fetchedApplications = [
          ...ownerSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            appliedDate: doc.data().appliedDate?.toDate
              ? doc.data().appliedDate.toDate().toLocaleDateString()
              : "Date not available", // Correct handling of timestamp
          })),
          ...receiverSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            appliedDate: doc.data().appliedDate?.toDate
              ? doc.data().appliedDate.toDate().toLocaleDateString()
              : "Date not available", // Correct handling of timestamp
          })),
        ];

        setApplications(fetchedApplications); // Update state with merged applications
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email !== "Email not available") {
      fetchApplications();
    }
  }, [email]);

  // Handle submit button click to show dialog
  const handleSubmitClick = (app) => {
    setSelectedApp(app);
    setShowDialog(true);
  };

  // Handle dialog actions and save to Firestore
  const handleDialogAction = async (action) => {
    if (selectedApp) {
      try {
        const db = getFirestore();
        const acceptRejectRef = collection(db, "accept_reject");

        // Add selected application data to Firestore with action (accept/reject)
        await addDoc(acceptRejectRef, {
          applicantName: selectedApp.applicantName,
          applicantEmail: selectedApp.applicantEmail,
          projectTitle: selectedApp.projectTitle,
          appliedDate: selectedApp.appliedDate,
          role: selectedApp.role,
          status: action, // accept or reject
        });

        console.log(`Application ${selectedApp.id} ${action}ed and saved to Firestore.`);
      } catch (error) {
        console.error("Error saving decision to Firestore:", error);
      }
    }
    
    setShowDialog(false);
  };

  return (
    <div className="my-project-requests">
      <header className="header">
        <h2>Applications</h2>
      </header>
      <p className="email-notice">Owner Email: {email}</p> {/* Display the email from context */}

      {loading ? (
        <div>Loading applications...</div> // Loading message while data is being fetched
      ) : applications.length > 0 ? (
        applications.map((app) => (
          <div className="application-card" key={app.id}>
            <div className="application-details">
              <p><span className="icon">👤</span> Applicant: {app.applicantName}</p>
              <p><span className="icon">✅</span> Email: {app.applicantEmail}</p>
              <p><span className="icon">🏢</span> Project: {app.projectTitle}</p>
              <p><span className="icon">👤</span> Role: {app.role}</p>
              <p><span className="icon">📘</span> Skill: {app.skill}</p>
              <p><span className="icon">🔗</span> <a href={app.portfolioUrl} className="link">Portfolio</a></p>
              <p><span className="icon">📄</span> <a href={app.resumeUrl} className="link">Resume</a></p>
              <div className="applied-info">
                <p className="applied-date"><span className="icon">🕒</span> Applied on: {app.appliedDate}</p>
                <button onClick={() => handleSubmitClick(app)} className="submit-button">Submit</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No applications found for this email.</p> // Message if no applications are found
      )}

      {/* Dialog Component */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>Do you want to accept or reject this application?</p>
            <button onClick={() => handleDialogAction("accept")} className="dialog-button accept-button">Accept</button>
            <button onClick={() => handleDialogAction("reject")} className="dialog-button reject-button">Reject</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProjectRequests;
