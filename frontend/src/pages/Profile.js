import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";

function Profile({ setPage, setIsLoggedIn, setIsAdmin, setAuthView }) {
  const [mediaList, setMediaList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("film");
  const [imageFile, setImageFile] = useState(null);

  const username = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "No email provided";

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/media");
        setMediaList(response.data);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      }
    };
    fetchMedia();
  }, [refreshKey]);

  // Filter media uploaded by current user
  const userMedia = mediaList.filter(
    (item) => item.uploadedBy && item.uploadedBy.toLowerCase() === username.toLowerCase()
  );

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    if (setAuthView) {
      setAuthView("selection");
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setTitle(item.title || "");
    setDescription(item.description || "");
    setDate(item.date || "");
    setCategory(item.category || "film");
    setImageFile(null);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("category", category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post(`http://localhost:9090/api/media/edit/${editingItem.id}`, formData);
      setRefreshKey((prev) => prev + 1);
      setIsEditModalOpen(false);
      alert("Media updated successfully ✅");
    } catch (err) {
      console.error("Failed to update media:", err);
      alert("Failed to update media ❌");
    }
  };

  return (
    <div className="profile-container">
      {/* Navbar matching home/media look */}
      <div className="navbar">
        <div className="logo" onClick={() => setPage("Home")} style={{ cursor: "pointer" }}>
          FGhub
        </div>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span onClick={() => setPage("Home")}>Home</span>
          <span onClick={() => setPage("store")}>Store</span>
          <span onClick={() => setPage("Media")}>Media</span>
        </div>
      </div>

      <div className="profile-main-layout">
        {/* Left Side: Profile Card */}
        <div className="profile-user-card">
          <div className="profile-avatar-large">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-user-info">
            <h2 className="profile-username">{username}</h2>
            <p className="profile-email">{email}</p>
          </div>
          <span className="profile-badge">Contributor Level 1</span>

          <div className="profile-stat-box">
            <div className="profile-stat-number">{userMedia.length}</div>
            <div className="profile-stat-label">Media Uploaded</div>
          </div>

          <button className="profile-logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>

        {/* Right Side: Uploaded Media Management */}
        <div className="profile-content-area">
          <h2 className="profile-section-title">My Uploaded Media</h2>

          {userMedia.length > 0 ? (
            <div className="profile-table-container">
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Release Date</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userMedia.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.img || "https://via.placeholder.com/60"}
                          className="profile-td-img"
                          alt={item.title}
                        />
                      </td>
                      <td style={{ fontWeight: "bold" }}>{item.title}</td>
                      <td>
                        <span className={`category-badge ${item.category ? item.category.toLowerCase() : "film"}`}>
                          {item.category || "Film"}
                        </span>
                      </td>
                      <td>{item.date}</td>
                      <td>⭐ {parseFloat(item.averageRating || 0).toFixed(1)}</td>
                      <td>
                        <button className="profile-btn-edit" onClick={() => openEditModal(item)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="profile-empty-state">
              <span className="profile-empty-icon">📁</span>
              <p className="profile-empty-text">
                You haven't uploaded any creative media assets to FGhub yet.
              </p>
              <button className="profile-empty-btn" onClick={() => setPage("store")}>
                Upload Your First Media
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {isEditModalOpen && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-content">
            <button className="profile-modal-close" onClick={() => setIsEditModalOpen(false)}>
              ×
            </button>
            <h2 className="profile-modal-title">Edit My Uploaded Media</h2>

            <form onSubmit={handleEditSubmit}>
              <div className="profile-form-group">
                <label>Media Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="profile-form-group">
                <label>Synopsis / Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="profile-form-group">
                <label>Release Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="profile-form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="film">Film</option>
                  <option value="game">Game</option>
                </select>
              </div>

              <div className="profile-form-group">
                <label>Update Poster (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <small style={{ display: "block", marginTop: "5px", color: "#888" }}>
                  Leave empty to keep your existing poster.
                </small>
              </div>

              <button type="submit" className="profile-btn-save">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
