import React from "react";
import MediaForm from "../components/MediaForm";
import "../styles/store.css";


function Store({ setPage }) {
  return (
    <div className="store-container">

      <div className="navbar">
        <div className="logo" onClick={() => setPage("Home")} style={{ cursor: "pointer" }}>FGhub</div>

        <div className="nav-links">
          <span onClick={() => setPage("Home")}>Home</span>
          <span onClick={() => setPage("Media")}>Media</span>
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