import React, { useState } from "react";
import axios from "axios";
import "../styles/MediaForm.css";
function MediaForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("category", category);
    if (image) formData.append("image", image);
    if (file) formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/api/media", formData);
      alert("Media successfully added to the vault! 🌌");
      // Reset form
      setTitle(""); setDescription(""); setDate(""); setCategory(""); setImage(null); setFile(null);
    } catch (err) {
      alert("Failed to upload media. Please check server.");
    }
  };

  return (
    <form className="media-form-advanced" onSubmit={handleSubmit}>
      <div className="media-form-header">
        <h2>Upload Media</h2>
        <p>Deploy new creative assets to the FGhub database</p>
      </div>

      <div className="input-group">
        <label>Media Title</label>
        <input type="text" placeholder="e.g. Cyberpunk 2077" className="media-input-adv" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="input-group">
        <label>Synopsis / Description</label>
        <textarea rows="3" placeholder="A brief description of this media..." className="media-input-adv" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="row-group">
        <div className="input-group half">
          <label>Release Date</label>
          <input type="date" className="media-input-adv" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="input-group half">
          <label>Category</label>
          <select className="media-input-adv media-select-adv" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Select Type</option>
            <option value="Film">Film</option>
            <option value="Game">Game</option>
          </select>
        </div>
      </div>

      <div className="upload-zones">
        <div className="upload-box">
           <input type="file" id="posterUpload" hidden onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
           <label htmlFor="posterUpload" className="upload-label">
              <span className="upload-icon">🖼️</span>
              <span className="upload-text">{image ? image.name : "Drop Poster Image Here or Click"}</span>
           </label>
        </div>

        <div className="upload-box">
           <input type="file" id="mediaUpload" hidden onChange={(e) => setFile(e.target.files[0])} />
           <label htmlFor="mediaUpload" className="upload-label">
              <span className="upload-icon">📁</span>
              <span className="upload-text">{file ? file.name : "Drop Media File Here or Click"}</span>
           </label>
        </div>
      </div>

      <button type="submit" className="media-submit-btn">
        <span className="btn-text">INITIALIZE UPLOAD</span>
        <span className="btn-arrow">→</span>
      </button>
    </form>
  );
}

export default MediaForm;