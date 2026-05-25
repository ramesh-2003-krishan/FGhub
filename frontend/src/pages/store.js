import React from "react";
import MediaForm from "../components/MediaForm";
import "../styles/store.css";


function Store({ setPage }) {
  return (
    <div className="store-container">

      <div className="navbar">
        <div className="logo" onClick={() => setPage("Home")} style={{ cursor: "pointer" }}>FGhub</div>

        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span onClick={() => setPage("Home")}>Home</span>
          <span onClick={() => setPage("Media")}>Media</span>
          <div className="profile-avatar-btn" onClick={() => setPage("Profile")} title="My Profile">
              {localStorage.getItem("username") ? localStorage.getItem("username").charAt(0).toUpperCase() : "👤"}
          </div>
        </div>
      </div>

      <div className="store-title">Store</div>

      <div className="store-form-section">
        <MediaForm />
      </div>

        <div className="footer">© 2026 FGhub. All rights reserved.</div>
      
    </div>
  );
}

export default Store;