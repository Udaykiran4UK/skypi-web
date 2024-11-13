// src/components/LoginScreen.js

import React, { useState } from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin, onSignup }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form className="login-form">
                <div className="input-group">
                    <span className="icon">📧</span>
                    <input type="email" placeholder="E-Mail" required />
                </div>
                <div className="input-group">
                    <span className="icon">🔒</span>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? "🙈" : "👁️"}
                    </span>
                </div>
                <button type="button" className="login-button" onClick={onLogin}>
                    LOGIN
                </button>
                <p>Don’t have an Account? <a href="#" onClick={onSignup}>Sign Up</a></p>
            </form>
        </div>
    );
};

export default LoginScreen;
