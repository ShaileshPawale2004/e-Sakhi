
# Rural Girls Digital Empowerment Platform

A Firebase-powered web platform built with React and Vite, aimed at digitally empowering rural girls in India through localized e-learning, mentorship, and entrepreneurship support.

## 🚀 Features

- 🌐 **Multilingual E-Learning**: YouTube-based learning with translated captions and audio (JOJ TTS API).
- 🧑‍🤝‍🧑 **Mentorship Rooms**: Real-time group and 1-on-1 rooms using PeerJS and Socket.io.
- 💼 **Entrepreneurship Toolkit**: Discover government schemes and business ideas.
- 🤖 **AI-Enhanced Learning**: Auto-generated quizzes using Gemini 2.0 Flash API and adaptive feedback.
- 📊 **Firebase Analytics**: Track every interaction, including course views and quiz attempts.

## 🧰 Tech Stack

- **Frontend**: React ⚛️, Vite ⚡, CSS 🎨
- **Backend/Cloud**: Firebase (Auth, Firestore, Analytics)
- **APIs & Tools**:
  - YouTube API (content & captions)
  - Google Translate API
  - JOJ Text-to-Speech API
  - EmailJS (feedback delivery)
  - Gemini 2.0 Flash (quiz generation)
  - DuckDuckGo API (resource search)
  - Custom Web Scraper (Gov scheme info)
- **Communication**: PeerJS, Socket.io

## 🗂️ Folder Structure (Important Files)

- `src/` - React components and logic
- `.env` - Environment variables (NOT included in Git)
- `firebaseConfig.js` - Firebase integration using VITE environment variables

## 🌍 Deployment

Deployed on [Render](https://render.com) with:
- 🔐 Firebase Auth (Email & Google)
- 🔄 Realtime Mentorship (PeerJS, Socket.io)
- 🎥 E-learning Integration (YouTube API)

## 📦 Environment Variables

Create a `.env` file in root with:

```
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-id
VITE_FIREBASE_APP_ID=your-id
VITE_FIREBASE_MEASUREMENT_ID=your-id
```

## 📌 How to Run Locally

```bash
npm install
npm run dev
```

## 📹 Demo & Links

- 📽️ Video Demo: *[Insert Video Link]*
- 🔗 Live: *[Insert Render Live Link]*
- 📁 GitHub: *[Insert Repo Link]*


Build for empowering India’s rural girls through digital means.
