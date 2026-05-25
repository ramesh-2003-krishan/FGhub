import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";

function Login({ setIsLoggedIn, setIsSignup, setAuthView }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9090/api/login", {
        username,
        password,
      });

      if (res.data) {
        alert("Login successful ✅");
        localStorage.setItem("username", username);
        localStorage.setItem("email", res.data.email || "");
        setIsLoggedIn(true);
      } else {
        alert("Invalid username or password ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

 return (
  
  <div className="login-container">

    <div className="navbar">
  <div className="logo">FGhub</div>

  <div className="nav-links">
    <span>STORE</span>
    <span>SUPPORT</span>
  </div>
</div>

    <div className="login-card">
      <span onClick={() => setAuthView("selection")} style={{ cursor: "pointer", color: "#aaa", fontSize: "12px", position: "absolute", top: "15px", left: "15px" }}>
         ⬅ Back
      </span>
      <h2 className="title" style={{ marginTop: "10px" }}>FGhub Premiere</h2>
      <p className="subtitle">Enter your credentials to access the vault</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />

        <button type="submit" className="login-btn">
          SIGN IN →
        </button>
      </form>

      <p className="signup-text">
        Don’t have an account?{" "}
        <span onClick={() => setIsSignup(true)}>SIGN UP</span>
      </p>
    </div>
  </div>
);
}

export default Login;