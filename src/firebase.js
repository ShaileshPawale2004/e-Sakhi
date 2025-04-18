// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBTT19E3RjiWzNVNqNNK0O2st1dsVuz0a0",
    authDomain: "rural-girls-platform-e4373.firebaseapp.com",
    projectId: "rural-girls-platform-e4373",
    storageBucket: "rural-girls-platform-e4373.firebasestorage.app",
    messagingSenderId: "1009349873522",
    appId: "1:1009349873522:web:97420d2400ad5c5bd497eb",
    measurementId: "G-HTRZNE921B"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);