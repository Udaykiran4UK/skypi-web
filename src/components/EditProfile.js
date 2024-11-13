import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./EditProfile.css";

function EditProfile() {
  const [formData, setFormData] = useState({
    username: "Name",
    bio: "let's walk together",
    email: "@gmail.com",
    gender: "Male",
    birthdate: "14-12-2006",
    location: "india",
  });

  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/80" // Default placeholder image
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);

    try {
      const userId = getAuth().currentUser.uid;
      let imageUrl = profileImage; // Default to current profile image URL

      // If a new image is selected, upload it to Firebase Storage
      
      // Update Firestore user document
      const db = getFirestore();
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        username: formData.username,
        bio: formData.bio,
        email: formData.email,
        gender: formData.gender,
        birthDate: formData.birthdate,
        location: formData.location,
        imageUrl: imageUrl, // Use the new or default image URL
      });

      setIsLoading(false);
      console.log("Profile updated successfully");

      // Redirect or notify user (e.g., navigate to previous page)
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating profile:", error);
    }
  };

  // Handle image change from file input
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setProfileImage(file); // Set the selected image file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Display the image preview
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    }
  };

  return (
    <div className="edit-profile">
      <header>
        <button className="back-button">←</button>
        <h2>Edit Profile</h2>
      </header>
      <div className="scroll-container">
        <div className="profile-photo">
          <img
            src={typeof profileImage === "string" ? profileImage : URL.createObjectURL(profileImage)}
            alt="Profile"
            className="profile-img"
          />
          <label htmlFor="file-input" className="change-photo">
            Change photo
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageChange} // Trigger image change
            style={{ display: "none" }} // Hide the file input
          />
        </div>
        <form>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label>Bio</label>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />

          <label>Birth Date</label>
          <input
            type="text"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </form>
        <button
          className="save-button"
          onClick={handleSaveChanges}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
