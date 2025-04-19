import React, { useState, useEffect } from "react";
import { auth, provider, analytics } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import "../styles/Auth.css";
import Spline from "@splinetool/react-spline"; // ✅ only this added

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_path: window.location.pathname
      });
    }
  }, []);

  const login = () => {
    if (analytics) logEvent(analytics, "login_attempt");
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(() => {
        if (analytics) logEvent(analytics, "login_success");
        navigate("/dashboard");
      })
      .catch(err => {
        if (analytics) logEvent(analytics, "login_error", { error: err.message });
        setMsg(err.message);
      });
  };

  const signup = () => {
    if (analytics) logEvent(analytics, "signup_attempt");
    createUserWithEmailAndPassword(auth, email.trim(), password)
      .then(() => {
        if (analytics) logEvent(analytics, "signup_success");
        navigate("/dashboard");
      })
      .catch(err => {
        if (analytics) logEvent(analytics, "signup_error", { error: err.message });
        setMsg(err.message);
      });
  };

  const registerWithGoogle = () => {
    if (analytics) logEvent(analytics, "google_signup_attempt");
    signInWithPopup(auth, provider)
      .then(result => {
        GoogleAuthProvider.credentialFromResult(result);
        if (analytics) logEvent(analytics, "google_signup_success");
        navigate("/dashboard");
      })
      .catch(error => {
        if (analytics) logEvent(analytics, "google_signup_error", { error: error.message });
        setMsg(error.message);
      });
  };

  return (
    <div className="auth-wrapper">
      <Spline
        scene="https://prod.spline.design/GkZ27JndmCostjgy/scene.splinecode"
        className="spline-bg"
      />
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Let’s Get You Logged In</h2>
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="auth-button login-btn" onClick={login}>
            Login
          </button>
          <button className="auth-button login-btn" onClick={signup}>
            Sign Up
          </button>
          <button className="auth-button login-btn" onClick={registerWithGoogle}>
            Sign in With Google
          </button>
          {msg && <p className="auth-message">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
