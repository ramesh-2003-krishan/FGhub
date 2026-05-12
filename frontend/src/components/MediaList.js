import React, { useEffect, useState } from "react";
import axios from "axios";

function MediaList({ category, onMediaClick, refreshKey, searchQuery }) {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, [refreshKey]);

  const fetchMedia = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/media");
      setMedia(response.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const filteredMedia = media.filter((item) => {
    // Check search query before category return
    if (searchQuery && item.title && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
    }

    if (!category) return true; 
    if (!item.category) return false;
    
    const itemCat = item.category.toLowerCase();
    
    
    if (category === "films" && (itemCat === "film" || itemCat === "films")) return true;
    if (category === "games" && (itemCat === "game" || itemCat === "games")) return true;
    return false;
  });

  return (
    <div style={{ color: "white" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredMedia.length > 0 ? (
          filteredMedia.map((item) => (
            <li 
              key={item.id} 
              className="media-item"
              onClick={() => onMediaClick && onMediaClick(item)}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#00ffc8" }}>{item.title}  <span style={{ fontSize: "14px", color: "#aaa" }}>({item.category})</span></h3>
              <p style={{ margin: "0 0 5px 0", color: "#ccc" }}>{item.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                <small style={{ color: "#888" }}>Date: {item.date}</small>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ color: "#ffc107", fontSize: "14px", fontWeight: "bold" }}>
                    ⭐ {parseFloat(item.averageRating || 0).toFixed(1)}
                  </span>
                  <span style={{ color: "#aaa", fontSize: "12px" }}>
                    ({item.ratingCount || 0} reviews)
                  </span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#aaa" }}>No {category} found. Upload some via the form!</p>
        )}
      </ul>
    </div>
  );
}

export default MediaList;