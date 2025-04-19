import React, { useEffect } from 'react';
import { FaGithub, FaEnvelope, FaLinkedin, FaHandsHelping } from 'react-icons/fa';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import '../styles/About.css';
import sheldonImg from '../assets/team/Ashutosh.jpg';
import saanviImg from '../assets/team/Sachin.jpg';
import ayeshaImg from '../assets/team/Shailesh.jpg';
import rahulImg from '../assets/team/Sheldon.jpg';

const About = () => {
  const mentors = [
    {
      name: "Ashutosh Naryalgol",
      role: "Team Leader",
      expertise: "Backend",
      image: sheldonImg
    },
    {
      name: "Sachin Kiragi",
      role: "Developer",
      expertise: "Backend",
      image: saanviImg
    },
    {
      name: "Shailesh Pawale",
      role: "Developer",
      expertise: "Frontend",
      image: ayeshaImg
    },
    {
      name: "Sheldon Pereira",
      role: "Developer",
      expertise: "Frontend",
      image: rahulImg
    }
  ];

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      label: "Email Us",
      value: "loosers.prabal95@gmail.com",
      link: "loosers.prabal95@gmail.com"
    },
  ];

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', { page: 'About Page' });
    }
  }, []);

  return (
    <div className="about-container">
      <div className="about-content">
        {/* Mission Section */}
        <section className="about-section">
          <h1 className="about-title">Our Mission</h1>
          <p className="mission-text">
            Empowering rural girls through digital education. We believe in creating opportunities that transcend geographical boundaries 
            and socio-economic barriers.
          </p>
        </section>

        {/* Initiative Info Section */}
        <section className="about-section">
          <h2>About the Initiative</h2>
          <div className="initiative-grid">
            <div className="initiative-card">
              <h3>Digital Education</h3>
              <p>Providing accessible, localized e-learning content tailored for rural communities.</p>
            </div>
            <div className="initiative-card">
              <h3>Skill Development</h3>
              <p>Focusing on practical skills that enable economic independence and growth.</p>
            </div>
            <div className="initiative-card">
              <h3>Community Support</h3>
              <p>Building a supportive network of learners, mentors, and educators.</p>
            </div>
            <div className="initiative-card">
              <h3>Career Guidance</h3>
              <p>Connecting learners with opportunities and professional mentorship.</p>
            </div>
          </div>
        </section>

        {/* Meet the Mentors Section */}
        <section className="about-section">
          <h2>Meet Our Team</h2>
          <div className="mentors-grid">
            {mentors.map((mentor, index) => (
              <div key={index} className="mentor-card">
                <img src={mentor.image} alt={mentor.name} className="mentor-image" />
                <h3>{mentor.name}</h3>
                <p className="mentor-role">{mentor.role}</p>
                <p className="mentor-expertise">{mentor.expertise}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="about-section">
          <h2>Get in Touch</h2>
          <div className="contact-grid">
            {contactMethods.map((method, index) => (
              <a 
                key={index} 
                href={method.link} 
                className="contact-card"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  if (analytics) {
                    logEvent(analytics, 'contact_click', {
                      method: method.label
                    });
                  }
                }}
              >
                <div className="contact-icon">{method.icon}</div>
                <h3>{method.label}</h3>
                <p>{method.value}</p>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;