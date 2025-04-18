import { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    preferredLanguage: 'English',
    joinDate: '2024-01-01',
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'Course Completion',
      details: 'Completed JavaScript Basics',
      date: '2024-04-15',
    },
    {
      id: 2,
      type: 'Quiz Score',
      details: 'Scored 95% in React Fundamentals',
      date: '2024-04-10',
    },
  ]);

  const languages = ['English', 'Spanish', 'French', 'German', 'Mandarin'];

  const handleLanguageChange = (e) => {
    setUserProfile(prev => ({
      ...prev,
      preferredLanguage: e.target.value
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
      <h1 className="profile-title">Profile</h1>
      
      {/* User Details Section */}
      <section className="profile-section">
        <h2>User Details</h2>
        <div className="user-info">
          <div className="info-group">
            <label>Name</label>
            <p>{userProfile.name}</p>
          </div>
          <div className="info-group">
            <label>Email</label>
            <p>{userProfile.email}</p>
          </div>
          <div className="info-group">
            <label>Member Since</label>
            <p>{new Date(userProfile.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      </section>

      {/* Language Preference Section */}
      <section className="profile-section">
        <h2>Language Preference</h2>
        <div className="language-selector">
          <select 
            value={userProfile.preferredLanguage}
            onChange={handleLanguageChange}
            className="profile-select"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Activity Logs Section */}
      <section className="profile-section">
        <h2>Activity Logs</h2>
        <div className="activity-list">
          {activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-header">
                <span className="activity-type">{activity.type}</span>
                <span className="activity-date">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
              <p className="activity-details">{activity.details}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default Profile;
