import React, { useState, useRef } from 'react';
import { FaComments, FaMicrophone, FaStop, FaPaperPlane } from 'react-icons/fa';
import '../styles/Feedback.css';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('text');
  const [textFeedback, setTextFeedback] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the feedback to your backend
    // For now, we'll just show an alert
    if (feedbackType === 'text') {
      alert('Thank you for your written feedback!');
      setTextFeedback('');
    } else {
      alert('Thank you for your audio feedback!');
      setAudioURL('');
      setRecordingTime(0);
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

        <div className="feedback-type-selector">
          <button 
            className={`type-btn ${feedbackType === 'text' ? 'active' : ''}`}
            onClick={() => setFeedbackType('text')}
          >
            Written Feedback
          </button>
          <button 
            className={`type-btn ${feedbackType === 'audio' ? 'active' : ''}`}
            onClick={() => setFeedbackType('audio')}
          >
            Voice Feedback
          </button>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          {feedbackType === 'text' ? (
            <div className="text-feedback">
              <textarea
                value={textFeedback}
                onChange={(e) => setTextFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or concerns..."
                rows="6"
                required
              />
            </div>
          ) : (
            <div className="audio-feedback">
              {!audioURL && !isRecording && (
                <button 
                  type="button"
                  className="record-btn"
                  onClick={startRecording}
                >
                  <FaMicrophone /> Start Recording
                </button>
              )}
              
              {isRecording && (
                <div className="recording-status">
                  <div className="recording-indicator" />
                  <span className="recording-time">{formatTime(recordingTime)}</span>
                  <button 
                    type="button"
                    className="stop-btn"
                    onClick={stopRecording}
                  >
                    <FaStop /> Stop Recording
                  </button>
                </div>
              )}

              {audioURL && (
                <div className="audio-preview">
                  <audio src={audioURL} controls />
                  <button 
                    type="button"
                    className="record-btn"
                    onClick={() => {
                      setAudioURL('');
                      setRecordingTime(0);
                    }}
                  >
                    Record Again
                  </button>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={feedbackType === 'text' ? !textFeedback : !audioURL}
          >
            <FaPaperPlane /> Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
