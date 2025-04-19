import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import '../styles/Profile.css';

const AVAILABLE_LANGUAGES = [
  'Hindi',
  'English',
  'Kannada',
  'Marathi',
  'Telugu',
  'Tamil',
  'Other'
];

const Profile = () => {
  const user = auth.currentUser;
  const uid  = user?.uid;
  const [email, setEmail]       = useState('');
  const [name, setName]         = useState('');
  const [address, setAddress]   = useState('');
  const [languages, setLanguages] = useState([]);
  const [msg, setMsg]           = useState('');

  // Log page_view on mount
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: window.location.pathname
      });
    }
  }, []);

  // Load existing profile data
  useEffect(() => {
    if (user?.email) setEmail(user.email);

    if (uid) {
      const ref = doc(db, 'users', uid);
      getDoc(ref).then(snap => {
        if (snap.exists()) {
          const data = snap.data();
          setName(data.name || '');
          setAddress(data.address || '');
          setLanguages(data.languages || []);
        }
      });
    }
  }, [user, uid]);

  const toggleLanguage = (lang) => {
    setLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const handleSave = async () => {
    if (analytics) {
      logEvent(analytics, 'profile_save', { email, name, address, languages });
    }
    if (!uid) {
      setMsg('Please log in to save your profile.');
      return;
    }
    try {
      const ref = doc(db, 'users', uid);
      await setDoc(ref, { email, name, address, languages }, { merge: true });
      setMsg('Profile saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setMsg('Error saving profile: ' + err.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2 className="profile-title">My Profile</h2>

        <label className="profile-label">Email (read-only)</label>
        <input
          type="email"
          className="profile-input"
          value={email}
          readOnly
        />

        <label className="profile-label">Name</label>
        <input
          type="text"
          className="profile-input"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label className="profile-label">Address</label>
        <input
          type="text"
          className="profile-input"
          placeholder="Enter your address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <label className="profile-label">Languages Known</label>
        <div className="profile-checkbox-group">
          {AVAILABLE_LANGUAGES.map(lang => (
            <label key={lang} className="profile-checkbox">
              <input
                type="checkbox"
                checked={languages.includes(lang)}
                onChange={() => toggleLanguage(lang)}
              />
              {lang}
            </label>
          ))}
        </div>

        <button
          className="btn btn-primary profile-save-btn"
          onClick={handleSave}
        >
          Save Profile
        </button>

        {msg && <p className="profile-message">{msg}</p>}
      </div>
    </div>
  );
};

export default Profile;
