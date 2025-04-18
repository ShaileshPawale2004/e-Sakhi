import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CourseDetail.css';
import { FaPlay, FaBook, FaQuestionCircle } from 'react-icons/fa';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('content');

  // Sample course data - should be fetched based on courseId
  const courseData = {
    'basic-math': {
      title: 'Basic Mathematics',
      description: 'Learn fundamental mathematical concepts including arithmetic, algebra, and geometry.',
      instructor: 'Dr. Sarah Johnson',
      videoUrl: 'https://www.youtube.com/embed/sample',
      content: [
        {
          title: 'Introduction to Numbers',
          type: 'video',
          duration: '10:00',
          completed: true
        },
        {
          title: 'Basic Operations',
          type: 'reading',
          duration: '15:00',
          completed: false
        },
        {
          title: 'Practice Quiz 1',
          type: 'quiz',
          duration: '20:00',
          completed: false
        }
      ],
      quiz: [
        {
          question: 'What is 5 + 7?',
          options: ['10', '11', '12', '13'],
          correct: 2
        },
        {
          question: 'Which operation comes first in BODMAS?',
          options: ['Division', 'Brackets', 'Addition', 'Multiplication'],
          correct: 1
        }
      ]
    },
    'digital-literacy': {
      title: 'Digital Literacy',
      description: 'Master essential computer skills, internet usage, and online safety.',
      instructor: 'Prof. Alex Chen',
      videoUrl: 'https://www.youtube.com/embed/sample2',
      content: [
        {
          title: 'Computer Basics',
          type: 'video',
          duration: '12:00',
          completed: false
        },
        {
          title: 'Internet Safety',
          type: 'reading',
          duration: '20:00',
          completed: false
        }
      ],
      quiz: [
        {
          question: 'What does URL stand for?',
          options: ['Universal Resource Locator', 'Unified Resource Link', 'Universal Reference Link', 'Unified Resource Locator'],
          correct: 0
        }
      ]
    }
  };

  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <p>The requested course does not exist.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'video':
        return (
          <div className="video-container">
            <iframe
              src={course.videoUrl}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-player"
            />
          </div>
        );
      case 'content':
        return (
          <div className="content-list">
            {course.content.map((item, index) => (
              <div key={index} className="content-item">
                <div className="content-icon">
                  {item.type === 'video' && <FaPlay />}
                  {item.type === 'reading' && <FaBook />}
                  {item.type === 'quiz' && <FaQuestionCircle />}
                </div>
                <div className="content-info">
                  <h4>{item.title}</h4>
                  <span>{item.duration}</span>
                </div>
                <div className="content-status">
                  {item.completed ? (
                    <span className="completed">Completed</span>
                  ) : (
                    <button className="start-btn">Start</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      case 'quiz':
        return (
          <div className="quiz-container">
            {course.quiz.map((question, index) => (
              <div key={index} className="quiz-question">
                <h4>Question {index + 1}: {question.question}</h4>
                <div className="options-grid">
                  {question.options.map((option, optIndex) => (
                    <button key={optIndex} className="option-btn">
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="course-detail-page">
      <div className="course-header">
        <div className="course-info">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="instructor">
            Instructor: {course.instructor}
          </div>
        </div>
      </div>

      <div className="course-content">
        <div className="content-tabs">
          <button
            className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            <FaPlay /> Video Lecture
          </button>
          <button
            className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            <FaBook /> Course Content
          </button>
          <button
            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <FaQuestionCircle /> Quiz
          </button>
        </div>

        <div className="tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
