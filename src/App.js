import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import YourApplications from './components/YourApplications';
import Profile from './components/Profile';
import ApplyProject from './components/ApplyProject';
import EditProfile from './components/EditProfile';
import ResumeAndEducation from './components/ResumeAndEducation';
import SkillsAndCertifications from './components/SkillsAndCertifications';
import PostProject from './components/PostProject';
import MyProjects from './components/MyProjects';
import PrivacyAndSecurity from './components/PrivacyAndSecurity';
import HelpAndSupport from './components/HelpAndSupport';
import Wishlist from './components/Wishlist';
import MyProjectRequests from './components/MyProjectRequests';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import './App.css';

// BottomNav component with navigation buttons
function BottomNav() {
    const navigate = useNavigate();

    return (
        <div className="bottom-nav">
            <button onClick={() => navigate('/')}>🏠</button> {/* Home */}
            <button onClick={() => navigate('/my-projects-requests')}>📨</button> {/* My Project Requests */}
            <button onClick={() => navigate('/your-applications')}>📋</button> {/* Your Applications */}
            <button onClick={() => navigate('/resume-education')}>📄</button> {/* Resume and Education */}
        </div>
    );
}

function App() {
    const [screen, setScreen] = useState("login"); // Initial screen set to "login"

    const handleLogin = () => {
        setScreen("home"); // Navigate to the home screen
    };

    const handleSignup = () => {
        setScreen("signup"); // Navigate to the signup screen
    };

    const handleSwitchToLogin = () => {
        setScreen("login"); // Navigate to the login screen
    };

    return (
        <UserProvider> {/* Wrap the entire app with UserProvider */}
            <Router>
                <div className="app">
                    {/* Conditional screen rendering for login/signup */}
                    {screen === "signup" && <SignupScreen onLogin={handleSwitchToLogin} />}
                    {screen === "login" && <LoginScreen onLogin={handleLogin} onSignup={handleSignup} />}
                    {screen === "home" && (
                        <>
                            {/* Routes for different pages */}
                            <Routes>
                                <Route path="/" element={<HomeScreen />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/project-details" element={<ProjectDetails />} />
                                <Route path="/apply" element={<ApplyProject />} />
                                <Route path="/your-applications" element={<YourApplications />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/privacy-and-security" element={<PrivacyAndSecurity />} />
                                <Route path="/edit-profile" element={<EditProfile />} />
                                <Route path="/help-and-support" element={<HelpAndSupport />} />
                                <Route path="/resume-education" element={<ResumeAndEducation />} />
                                <Route path="/my-projects" element={<MyProjects />} />
                                <Route path="/skills-certifications" element={<SkillsAndCertifications />} />
                                <Route path="/post-project" element={<PostProject />} />
                                <Route path="/wishlist" element={<Wishlist />} /> 
                                <Route path="/my-projects-requests" element={<MyProjectRequests />} />
                            </Routes>
                            {/* Bottom navigation component */}
                            <BottomNav />
                        </>
                    )}
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
