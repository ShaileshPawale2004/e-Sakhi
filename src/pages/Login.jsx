import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/dashboard"))
      .catch(err => setMsg(err.message));
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/dashboard"))
      .catch(err => setMsg(err.message));
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back</h2>
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
        <button className="auth-button signup-btn" onClick={signup}>
          Sign Up
        </button>
        {msg && <p className="auth-message">{msg}</p>}
      </div>
    </div>
  );
};

export default Login;