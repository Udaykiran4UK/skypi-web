import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HelpAndSupport.css';

function HelpAndSupport() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const faqItem = (question, answer) => (
    <div className="faq-item">
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </div>
  );

  return (
    <div className="help-support-container">
      <div className="header">
        <button className="back-button" onClick={handleBackClick}>←</button>
        <h1 className="header-title">Help and Support</h1>
      </div>

      <div className="content">
        <section className="faq-section">
          <h2>Frequently Asked Questions (FAQs)</h2>
          {faqItem(
            '1. What is SKYPI?',
            'SKYPI is a pioneering platform designed to enhance technical skills through daily tasks, personalized feedback, and expert assessments.'
          )}
          {faqItem(
            '2. How do I create an account?',
            'To create an account, simply download the app, click on "Sign Up," and fill in the required information.'
          )}
          {faqItem(
            '3. How can I submit my tasks?',
            'You can submit your tasks directly through the app. Go to the "Upload Tasks" section, select your task, and follow the submission instructions.'
          )}
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>If you need further assistance, please reach out to our support team:</p>
          <p>Email: skypi.help@gamil.com</p>
        </section>
      </div>
    </div>
  );
}

export default HelpAndSupport;
