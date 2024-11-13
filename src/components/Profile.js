// src/components/Profile.js
import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext"; // Import the custom hook

function Profile() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { userDetails, setUserDetails } = useUser(); // Get user details from context

  // Fetch user details from Firestore if not already set
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && !userDetails) { // Only fetch if not already in context
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserDetails({
              username: data.username || "Username",
              bio: data.bio || "Bio not available",
              email: data.email || "Email not available",
              location: data.location || "Location not available",
            });
          } else {
            console.log("No user data found");
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [setUserDetails, userDetails]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleMyProjectsClick = () => handleNavigation("/my-projects");
  const handleWishlistClick = () => handleNavigation("/wishlist");
  const handleMyProjectRequestsClick = () => handleNavigation("/my-projects-requests");

  const handleLogoutClick = () => setShowLogoutDialog(true);
  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    navigate("/login");
  };
  const handleCancelLogout = () => setShowLogoutDialog(false);

  return (
    <div className="profile-container">
      {userDetails ? (
        <>
          <div className="profile-header">
            <img
              src="https://via.placeholder.com/100" // Placeholder for profile picture
              alt="Profile"
              className="profile-picture"
            />
            <h2 className="profile-name">{userDetails.username}</h2>
            <p className="profile-bio">{userDetails.bio}</p>
            <p className="profile-email">{userDetails.email}</p>
            <p className="profile-location">{userDetails.location}</p>
          </div>

          <div className="profile-options">
            <button onClick={() => handleNavigation("/edit-profile")}>👤 Edit Profile</button>
            <button onClick={() => handleNavigation("/your-applications")}>📄 My Application</button>
            <button onClick={() => handleNavigation("/dashboard")}>📝 Dashboard</button>
            <button onClick={() => handleNavigation("/privacy-and-security")}>🔒 Privacy And Security</button>
            <button onClick={() => handleNavigation("/help-and-support")}>❓ Help And Support</button>
            <button onClick={handleMyProjectsClick}>📂 My Projects</button>
            <button onClick={handleMyProjectRequestsClick}>📨 My Projects Requests</button>
            <button onClick={handleLogoutClick}>🚪 Logout</button>
          </div>

          {/* Logout Confirmation Dialog */}
          {showLogoutDialog && (
            <div className="logout-dialog">
              <div className="logout-dialog-content">
                <p>Are you sure you want to logout?</p>
                <div className="logout-dialog-buttons">
                  <button onClick={handleConfirmLogout} className="logout-dialog-yes">Yes</button>
                  <button onClick={handleCancelLogout} className="logout-dialog-no">No</button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="loading">Loading user details...</div>
      )}
    </div>
  );
}

export default Profile;
