import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';
import { FaGraduationCap, FaUsers, FaLaptopCode } from 'react-icons/fa';

const Landing = () => {
  const features = [
    {
      icon: <FaGraduationCap className="feature-icon" />,
      title: "Quality Education",
      description: "Access to high-quality educational resources and personalized learning paths."
    },
    {
      icon: <FaUsers className="feature-icon" />,
      title: "Mentorship",
      description: "Connect with experienced mentors who guide and support your journey."
    },
    {
      icon: <FaLaptopCode className="feature-icon" />,
      title: "Tech Skills",
      description: "Learn practical technology skills that are relevant in today's digital world."
    }
  ];

  const testimonials = [
    {
      text: "This platform opened up new opportunities for me. The mentorship program helped me pursue my dreams in technology.",
      author: "Priya Sharma",
      role: "Computer Science Student",
      location: "Rural Maharashtra"
    },
    {
      text: "I learned coding from scratch and now I'm working as a web developer. This platform changed my life.",
      author: "Anjali Patel",
      role: "Web Developer",
      location: "Rural Gujarat"
    }
  ];

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Empowering Rural Girls Through Technology Education</h1>
          <p className="hero-text">
            Join our platform to access quality education, mentorship, and opportunities in technology.
            Together, we can break barriers and create a more inclusive digital future.
          </p>
          <Link to="/login" className="btn btn-primary">Get Started</Link>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {feature.icon}
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-name">{testimonial.author}</div>
                <div className="author-role">{testimonial.role}</div>
                <div className="author-location">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Start Your Journey Today</h2>
          <p className="cta-text">
            Take the first step towards your tech career. Join our community of ambitious learners.
          </p>
          <Link to="/login" className="btn btn-primary">Join Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;