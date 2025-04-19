import React, { useState } from 'react';
import { FaComments, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { auth } from '../firebase';
import '../styles/Feedback.css';

const Feedback = () => {
  const [textFeedback, setTextFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to submit feedback.");
      return;
    }

    try {
      await emailjs.send(
        "service_0y8c8np",
        "template_25f4xsw",
        {
          title: "Feedback (TEXT)",
          name: user.email.split('@')[0],
          email: user.email,
          message: textFeedback,
          time: new Date().toLocaleString(),
        },
        "tgkg9ZtNpGI0yWvrz"
      );

      alert("✅ Feedback sent to Gmail successfully!");
      setTextFeedback("");
    } catch (error) {
      console.error("❌ EmailJS error:", error);
      alert("❌ Failed to send feedback via email.");
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-content">
        <header className="feedback-header">
          <FaComments className="feedback-icon" />
          <h1>Share Your Feedback</h1>
          <p>Help us improve your learning experience</p>
        </header>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="text-feedback">
            <textarea
              value={textFeedback}
              onChange={(e) => setTextFeedback(e.target.value)}
              placeholder="Share your thoughts, suggestions, or concerns..."
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!textFeedback}
          >
            <FaPaperPlane /> Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;