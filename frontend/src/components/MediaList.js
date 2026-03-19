import React, { useEffect, useState } from "react";
import axios from "axios";

function MediaList() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const response = await axios.get("http://localhost:8080/api/media");
    setMedia(response.data);
  };

  return (
    <div>
      <h3>All Media</h3>
      <ul>
        {media.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> - {item.description} ({item.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MediaList;