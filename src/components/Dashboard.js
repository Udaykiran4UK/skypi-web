// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useUser } from '../context/UserContext'; // Use `useUser` instead of `useUserContext`

function Dashboard() {
  const { userDetails } = useUser(); // Get user details from the UserContext
  const [educationData, setEducationData] = useState([]);
  
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'Skills_And_Education'));
        
        const educationList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setEducationData(educationList);
      } catch (error) {
        console.error('Error fetching education data:', error);
      }
    };
    
    fetchEducationData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      {userDetails && (
        <div className="user-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Bio:</strong> {userDetails.bio}</p>
          <p><strong>Location:</strong> {userDetails.location}</p>
        </div>
      )}
      
      <h3>Education Details</h3>
      {educationData.length > 0 ? (
        <div className="education-list">
          {educationData.map((edu) => (
            <div key={edu.id} className="education-item">
              <p><strong>Level of Education:</strong> {edu.levelOfEducation}</p>
              <p><strong>Stream:</strong> {edu.stream}</p>
              <p><strong>College Name:</strong> {edu.collegeName}</p>
              <p><strong>Location:</strong> {edu.location}</p>
              <p><strong>Time Period:</strong> {edu.timePeriod.from} - {edu.timePeriod.to}</p>
              <p><strong>User Email:</strong> {edu.userEmail}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No education details found.</p>
      )}
    </div>
  );
}

export default Dashboard;
