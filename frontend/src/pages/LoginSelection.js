import React from "react";
import "../styles/login.css";

function LoginSelection({ setAuthView }) {
  return (
    <div className="login-container">
      <div className="navbar">
        <div className="logo">FGhub</div>
        <div className="nav-links">
          <span>STORE</span>
          <span>SUPPORT</span>
        </div>
      </div>

      <div className="login-card" style={{ width: "400px", textAlign: "center" }}>
        <h2 className="title">Welcome to FGhub</h2>
        <p className="subtitle">Please select your access level</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "30px" }}>
          <button 
            className="login-btn" 
            style={{ width: "100%", padding: "15px", fontSize: "16px" }}
            onClick={() => setAuthView("user_login")}
          >
            👤 Login as User
          </button>

          <button 
            className="login-btn" 
            style={{ width: "100%", padding: "15px", fontSize: "16px", background: "linear-gradient(90deg, #ff0055, #990033)", color: "#fff" }}
            onClick={() => setAuthView("admin_login")}
          >
            🛡️ Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSelection;
