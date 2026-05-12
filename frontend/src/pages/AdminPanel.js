import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

function AdminPanel({ setIsLoggedIn, setIsAdmin, setPage }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("film");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/media");
        setMediaItems(response.data);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      }
    };
    fetchMedia();
  }, [refreshKey]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
   
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      try {
        await axios.delete(`http://localhost:8080/api/media/${id}`);
        setRefreshKey(prev => prev + 1);
        alert("Deleted successfully ✅");
      } catch (err) {
        console.error(err);
        alert("Failed to delete media ❌");
      }
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

      await axios.post(`http://localhost:8080/api/media/edit/${editingItem.id}`, formData);
      setRefreshKey(prev => prev + 1);
      setIsEditModalOpen(false);
      alert("Media updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update media ❌");
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-logo">FGhub Admin</div>
        <div>
           <button className="btn-edit" onClick={() => setPage("Home")} style={{ marginRight: "20px" }}>View Live Site</button>
           <button className="admin-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="admin-content">
        <h1 className="admin-title">Media Management</h1>

        <div className="admin-table-container">
          <table className="admin-table">
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
              {mediaItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img || "https://via.placeholder.com/60"} className="admin-td-img" alt={item.title} />
                  </td>
                  <td style={{ fontWeight: "bold" }}>{item.title}</td>
                  <td style={{ textTransform: "capitalize" }}>{item.category}</td>
                  <td>{item.date}</td>
                  <td>⭐ {parseFloat(item.averageRating || 0).toFixed(1)} <br/><small style={{color:"#888"}}>{item.ratingCount || 0} reviews</small></td>
                  <td>
                    <button className="btn-edit" onClick={() => openEditModal(item)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {mediaItems.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "#aaa" }}>No media uploaded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

     
      {isEditModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <button className="admin-modal-close" onClick={() => setIsEditModalOpen(false)}>×</button>
            <h2 className="admin-modal-title">Edit Media</h2>
            
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
              </div>

              <div className="form-group">
                <label>Date / Year</label>
                <input type="text" value={date} onChange={e => setDate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} required>
                  <option value="film">Film</option>
                  <option value="game">Game</option>
                </select>
              </div>

              <div className="form-group">
                <label>Update Image (Optional)</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                <small style={{display:"block", marginTop:"5px", color:"#888"}}>Leave empty to keep the current image.</small>
              </div>

              <button type="submit" className="btn-save">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
