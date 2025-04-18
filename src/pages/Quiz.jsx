import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';
import { FaCheck, FaTimes, FaClock, FaMedal } from 'react-icons/fa';

const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [answers, setAnswers] = useState([]);

  // Sample quiz data - should be fetched based on courseId
  const quizData = {
    'basic-math': {
      title: 'Basic Mathematics Assessment',
      questions: [
        {
          question: 'What is 15 + 27?',
          options: ['41', '42', '43', '44'],
          correct: 1,
          explanation: '15 + 27 = 42'
        },
        {
          question: 'Which of these is not a prime number?',
          options: ['2', '3', '4', '5'],
          correct: 2,
          explanation: '4 is not a prime number as it can be divided by 2'
        },
        {
          question: 'What is 8 × 7?',
          options: ['54', '56', '58', '60'],
          correct: 1,
          explanation: '8 × 7 = 56'
        }
      ]
    },
    'digital-literacy': {
      title: 'Digital Literacy Test',
      questions: [
        {
          question: 'What does CPU stand for?',
          options: [
            'Central Processing Unit',
            'Computer Personal Unit',
            'Central Program Utility',
            'Computer Processing Unit'
          ],
          correct: 0,
          explanation: 'CPU stands for Central Processing Unit'
        },
        {
          question: 'Which of these is a secure password?',
          options: [
            'password123',
            'qwerty',
            'P@ssw0rd!2023',
            'abcdef'
          ],
          correct: 2,
          explanation: 'A secure password should contain uppercase, lowercase, numbers, and special characters'
        }
      ]
    }
  };

  const quiz = quizData[courseId];

  useEffect(() => {
    if (!quiz) {
      navigate('/learn');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, navigate]);

  if (!quiz) {
    return null;
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResults) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    // Save answer
    setAnswers([...answers, {
      questionIndex: currentQuestion,
      selected: selectedAnswer,
      correct: quiz.questions[currentQuestion].correct === selectedAnswer
    }]);

    if (selectedAnswer === quiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getResultMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80) return 'Excellent! You\'ve mastered this topic!';
    if (percentage >= 60) return 'Good job! Keep practicing to improve further.';
    return 'Keep learning! Review the material and try again.';
  };

  if (showResults) {
    return (
      <div className="quiz-page">
        <div className="quiz-container results">
          <h1>Quiz Results</h1>
          <div className="score-display">
            <FaMedal className="score-icon" />
            <h2>Your Score: {score}/{quiz.questions.length}</h2>
            <p>{getResultMessage()}</p>
          </div>

          <div className="answers-review">
            <h3>Review Your Answers</h3>
            {answers.map((answer, index) => (
              <div key={index} className={`answer-review ${answer.correct ? 'correct' : 'incorrect'}`}>
                <h4>Question {index + 1}: {quiz.questions[index].question}</h4>
                <p>Your answer: {quiz.questions[index].options[answer.selected]}</p>
                <p>Correct answer: {quiz.questions[index].options[quiz.questions[index].correct]}</p>
                <p className="explanation">{quiz.questions[index].explanation}</p>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button onClick={() => navigate(`/learn/${courseId}`)}>Back to Course</button>
            <button onClick={() => window.location.reload()}>Retry Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>{quiz.title}</h1>
          <div className="quiz-progress">
            <div className="progress-info">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span className="timer">
                <FaClock /> {formatTime(timeLeft)}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="question-container">
          <h2 className="question-text">
            {quiz.questions[currentQuestion].question}
          </h2>

          <div className="options-grid">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-actions">
          <button
            className="next-btn"
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestion + 1 === quiz.questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
