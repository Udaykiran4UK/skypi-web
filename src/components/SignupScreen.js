// src/components/SignupScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import './SignupScreen.css';

const SignupScreen = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const isEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    const isPhoneNumber = (input) => /^\+?[0-9]{10,15}$/.test(input);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (!username || !emailOrPhone || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (isEmail(emailOrPhone)) {
            await signUpWithEmail(username, emailOrPhone, password);
        } else if (isPhoneNumber(emailOrPhone)) {
            await signUpWithPhoneNumber(username, emailOrPhone);
        } else {
            setError("Please enter a valid email or phone number");
        }
    };

    const signUpWithEmail = async (username, email, password) => {
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
                setError("An account with this email already exists.");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
                createdAt: new Date(),
            });

            navigate('/home'); // Ensure this route is configured in your router
        } catch (error) {
            setError(`Signup failed: email already used try to login}`);
        }
    };

    const signUpWithPhoneNumber = async (username, phoneNumber) => {
        try {
            const usersCollection = collection(db, "users");
            const q = query(usersCollection, where("phoneNumber", "==", phoneNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("An account with this phone number already exists.");
                return;
            }

            await setDoc(doc(db, "users", phoneNumber), {
                username,
                phoneNumber,
                createdAt: new Date(),
            });

            navigate('/home');
        } catch (error) {
            setError(`Signup failed: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <h2>Create a new Account</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="input-group">
                    <span className="icon">👤</span>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <span className="icon">📧</span>
                    <input 
                        type="text" 
                        placeholder="Email or Phone Number" 
                        required 
                        value={emailOrPhone} 
                        onChange={(e) => setEmailOrPhone(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <span className="icon">🔒</span>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <span className="icon">🔒</span>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="signup-button">SIGN UP</button>
                <p>Already have an Account? <a href="#" onClick={onLogin}>Login</a></p>
            </form>
        </div>
    );
};

export default SignupScreen;
