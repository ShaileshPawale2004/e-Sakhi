import React from 'react';
import { FaGithub, FaEnvelope, FaLinkedin, FaHandsHelping } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  const mentors = [
    {
      name: "Sarah Johnson",
      role: "Tech Lead & Mentor",
      expertise: "Web Development",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Priya Sharma",
      role: "Education Coordinator",
      expertise: "Digital Literacy",
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Maria Garcia",
      role: "Community Manager",
      expertise: "Community Building",
      image: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      label: "Email Us",
      value: "contact@ruralgirlsplatform.org",
      link: "mailto:contact@ruralgirlsplatform.org"
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: "Contribute to our platform",
      link: "https://github.com/rural-girls-platform"
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "Follow our journey",
      link: "https://linkedin.com/company/rural-girls-platform"
    }
  ];

  return (
    <div className="about-container">
      <div className="about-content">
        {/* Mission Section */}
        <section className="about-section">
          <h1 className="about-title">Our Mission</h1>
          <p className="mission-text">
            Empowering rural girls through digital education and skill development. 
            We believe in creating opportunities that transcend geographical boundaries 
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
          <h2>Meet Our Mentors</h2>
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
              >
                <div className="contact-icon">{method.icon}</div>
                <h3>{method.label}</h3>
                <p>{method.value}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contribute Section */}
        <section className="about-section contribute-section">
          <h2>How to Contribute</h2>
          <div className="contribute-content">
            <div className="contribute-icon">
              <FaHandsHelping />
            </div>
            <div className="contribute-text">
              <p>
                We welcome contributions from developers, educators, and mentors. 
                Whether you want to improve our platform, create educational content, 
                or mentor students, there's a place for you in our community.
              </p>
              <a href="https://github.com/rural-girls-platform" className="contribute-button">
                Join as Contributor
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
