import React, { useState } from "react";
import "../styles/login.css";

function AdminLogin({ setIsLoggedIn, setIsAdmin, setAuthView, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

   
    if (username === "admin" && password === "admin") {
      alert("Admin Login successful ✅");
      setIsAdmin(true);
      setIsLoggedIn(true);
      setPage("Admin");
    } else {
      alert("Invalid Admin Credentials ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="navbar">
        <div className="logo">FGhub Admin</div>
        <div className="nav-links">
        </div>
      </div>

      <div className="login-card" style={{ border: "1px solid #ff0055", boxShadow: "0 0 25px rgba(255, 0, 85, 0.2)" }}>
        <span onClick={() => setAuthView("selection")} style={{ cursor: "pointer", color: "#aaa", fontSize: "12px", position: "absolute", top: "15px", left: "15px" }}>
           ⬅ Back
        </span>
        <h2 className="title" style={{ marginTop: "10px", color: "#ff0055" }}>Admin Portal</h2>
        <p className="subtitle">Enter access level credentials</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
            style={{ borderColor: "#660022" }}
          />

          <input
            type="password"
            placeholder="Passkey"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
            style={{ borderColor: "#660022" }}
          />

          <button type="submit" className="login-btn" style={{ background: "linear-gradient(90deg, #ff0055, #990033)", color: "#fff" }}>
            AUTHORIZE →
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
