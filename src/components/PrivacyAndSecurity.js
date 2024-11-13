// src/components/PrivacyAndSecurity.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivacyAndSecurity.css';

const PrivacyAndSecurity = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const buildSectionTitle = (title) => (
    <h2 className="section-title">{title}</h2>
  );

  const buildBulletText = (text) => (
    <p className="bullet-text">• {text}</p>
  );

  return (
    <div className="privacy-security-container">
      <header className="header">
        <button className="back-button" onClick={handleBackClick}>&larr;</button>
        <h1 className="header-title">Privacy & Security</h1>
      </header>
      <div className="content">
        <h2 className="main-title">SKYPI Privacy and Security Policy</h2>
        <p className="main-text">
          At SKYPI, we prioritize the protection of our users' data and adhere to the highest industry standards. This policy outlines our commitment to safeguarding user information.
        </p>

        {buildSectionTitle('1. Data Collection and Use')}
        {buildBulletText('SKYPI collects personal and technical data, including:')}
        {buildBulletText('User profiles (name, email)')}
        {buildBulletText('Task submissions and solutions')}
        {buildBulletText('Progress tracking and analytics')}
        {buildBulletText('We use this data to:')}
        {buildBulletText('Provide personalized learning experiences')}
        {buildBulletText('Offer tailored feedback and assessments')}
        {buildBulletText('Enhance platform performance and security')}
        {buildBulletText('Communicate updates and support')}

        {buildSectionTitle('2. Data Storage and Protection')}
        {buildBulletText('We implement robust security measures to protect user data, including:')}
        {buildBulletText('AES-256 encryption for data at rest and in transit')}
        {buildBulletText('Utilization of secure servers with regular backups')}
        {buildBulletText('Multi-factor authentication and role-based permissions')}
        {buildBulletText('Ongoing security audits and penetration testing')}

        {buildSectionTitle('3. User Rights and Consent')}
        {buildBulletText('Access and update their personal data')}
        {buildBulletText('Withdraw consent for data processing')}
        {buildBulletText('Request data deletion (subject to applicable laws)')}
        {buildBulletText('Opt-out of promotional communications')}

        {buildSectionTitle('4. Data Sharing and Disclosure')}
        {buildBulletText('SKYPI does not share user data with third parties, except:')}
        {buildBulletText('With user consent')}
        {buildBulletText('To comply with legal obligations')}
        {buildBulletText('With trusted service providers (e.g., email services)')}

        {buildSectionTitle('5. Security Measures')}
        {buildBulletText('Firewall protection and intrusion detection systems')}
        {buildBulletText('Regular software updates and patches')}
        {buildBulletText('Secure coding practices following OWASP guidelines')}
        {buildBulletText('Incident response and disaster recovery plans')}

        {buildSectionTitle('6. Compliance and Certification')}
        {buildBulletText('SKYPI adheres to relevant regulations and best practices, including:')}
        {buildBulletText('General Data Protection Regulation (GDPR)')}
        {buildBulletText('Children\'s Online Privacy Protection Act (COPPA)')}

        {buildSectionTitle('7. Policy Updates')}
        {buildBulletText('This policy may be updated. Changes will be effective immediately upon posting. By using SKYPI, users acknowledge acceptance of this Privacy and Security Policy.')}
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;
