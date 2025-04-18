import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Learn.css';

const Learn = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample course data - can be moved to Firestore later
  const courses = {
    foundational: [
      {
        id: 'basic-math',
        title: 'Basic Mathematics',
        description: 'Learn fundamental mathematical concepts including arithmetic, algebra, and geometry.',
        languages: ['English', 'Hindi', 'Kannada'],
        category: 'foundational'
      },
      {
        id: 'digital-literacy',
        title: 'Digital Literacy',
        description: 'Master essential computer skills, internet usage, and online safety.',
        languages: ['English', 'Hindi'],
        category: 'foundational'
      },
      {
        id: 'english-basics',
        title: 'English Language Basics',
        description: 'Build a strong foundation in English through reading, writing, and speaking exercises.',
        languages: ['Hindi', 'Kannada'],
        category: 'foundational'
      }
    ],
    softSkills: [
      {
        id: 'communication',
        title: 'Effective Communication',
        description: 'Develop strong verbal and written communication skills for personal and professional growth.',
        languages: ['English', 'Hindi', 'Kannada'],
        category: 'soft-skills'
      },
      {
        id: 'leadership',
        title: 'Leadership Skills',
        description: 'Learn to lead, motivate, and inspire others while working in teams.',
        languages: ['English', 'Hindi'],
        category: 'soft-skills'
      },
      {
        id: 'time-management',
        title: 'Time Management',
        description: 'Master techniques to organize your time effectively and boost productivity.',
        languages: ['English', 'Kannada'],
        category: 'soft-skills'
      }
    ]
  };

  const filteredCourses = (courseList) => {
    return courseList.filter(course => {
      const matchesLanguage = selectedLanguage === 'all' || course.languages.includes(selectedLanguage);
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLanguage && matchesSearch;
    });
  };

  const handleStartCourse = (courseId) => {
    navigate(/learn/${courseId});
  };

  const CourseCard = ({ course }) => (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-description">{course.description}</p>
      <div className="course-tags">
        {course.languages.map(lang => (
          <span key={lang} className="language-tag">{lang}</span>
        ))}
      </div>
      <button 
        className="start-button"
        onClick={() => handleStartCourse(course.id)}
      >
        Start Learning
      </button>
    </div>
  );

  return (
    <div className="learn-page">
      <div className="learn-content">
        <header className="learn-header">
          <h1 className="learn-title">E-Learning Portal</h1>
          <div className="learn-filters">
            <select 
              className="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="all">All Languages</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Kannada">Kannada</option>
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <section className="course-section">
          <h2 className="section-title">Foundational Subjects</h2>
          <div className="course-grid">
            {filteredCourses(courses.foundational).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <section className="course-section">
          <h2 className="section-title">Soft Skills & Personal Growth</h2>
          <div className="course-grid">
            {filteredCourses(courses.softSkills).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Learn;