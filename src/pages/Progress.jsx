import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Progress.css';
import { FaMedal, FaDownload, FaBook, FaClock, FaTrophy } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Progress = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Sample user progress data - should be fetched from Firebase
  const userProgress = {
    name: "Sarah Smith",
    enrolledDate: "January 2025",
    completedCourses: [
      {
        id: 'basic-math',
        title: 'Basic Mathematics',
        progress: 100,
        score: 95,
        completedDate: '2025-04-15',
        modules: [
          { name: 'Introduction to Numbers', completed: true },
          { name: 'Basic Operations', completed: true },
          { name: 'Practice Quiz 1', completed: true }
        ]
      },
      {
        id: 'digital-literacy',
        title: 'Digital Literacy',
        progress: 75,
        score: 88,
        completedDate: null,
        modules: [
          { name: 'Computer Basics', completed: true },
          { name: 'Internet Safety', completed: true },
          { name: 'Digital Tools', completed: false },
          { name: 'Final Assessment', completed: false }
        ]
      }
    ],
    totalHoursSpent: 45,
    averageScore: 91
  };

  const downloadCertificate = async (course) => {
    const certificateElement = document.getElementById('certificate-template');
    
    try {
      const canvas = await html2canvas(certificateElement);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${course.title.toLowerCase().replace(/\\s+/g, '-')}-certificate.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const renderCertificate = (course) => {
    if (!course.completedDate) return null;

    return (
      <div id="certificate-template" className="certificate">
        <div className="certificate-content">
          <div className="certificate-header">
            <FaMedal className="certificate-icon" />
            <h2>Certificate of Completion</h2>
          </div>
          <div className="certificate-body">
            <p>This is to certify that</p>
            <h3>{userProgress.name}</h3>
            <p>has successfully completed the course</p>
            <h4>{course.title}</h4>
            <p>with a score of</p>
            <h3>{course.score}%</h3>
            <p className="completion-date">Completed on {new Date(course.completedDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="progress-page">
      <div className="progress-content">
        <header className="progress-header">
          <h1>Learning Progress</h1>
          <div className="user-stats">
            <div className="stat-card">
              <FaBook className="stat-icon" />
              <div className="stat-info">
                <h4>Courses Enrolled</h4>
                <p>{userProgress.completedCourses.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <FaClock className="stat-icon" />
              <div className="stat-info">
                <h4>Total Hours</h4>
                <p>{userProgress.totalHoursSpent}h</p>
              </div>
            </div>
            <div className="stat-card">
              <FaTrophy className="stat-icon" />
              <div className="stat-info">
                <h4>Average Score</h4>
                <p>{userProgress.averageScore}%</p>
              </div>
            </div>
          </div>
        </header>

        <section className="courses-progress">
          <h2>Your Courses</h2>
          <div className="course-cards">
            {userProgress.completedCourses.map((course) => (
              <div key={course.id} className="course-progress-card">
                <div className="course-progress-header">
                  <h3>{course.title}</h3>
                  <div className="progress-circle">
                    <div className="progress-text">{course.progress}%</div>
                  </div>
                </div>
                
                <div className="modules-progress">
                  {course.modules.map((module, index) => (
                    <div key={index} className={`module-item ${module.completed ? 'completed' : ''}`}>
                      <span className="module-name">{module.name}</span>
                      <span className="module-status">
                        {module.completed ? '✓' : 'In Progress'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="course-actions">
                  {course.completedDate && (
                    <button 
                      className="certificate-btn"
                      onClick={() => {
                        setSelectedCourse(course);
                        downloadCertificate(course);
                      }}
                    >
                      <FaDownload /> Download Certificate
                    </button>
                  )}
                  <button 
                    className="continue-btn"
                    onClick={() => navigate(`/learn/${course.id}`)}
                  >
                    {course.completedDate ? 'Review Course' : 'Continue Learning'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedCourse && renderCertificate(selectedCourse)}
      </div>
    </div>
  );
};

export default Progress;

