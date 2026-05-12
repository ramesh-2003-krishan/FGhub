import React, {useState} from "react";
import axios from "axios";

function RateMedia({ media, currentRating, onRateSuccess }) {
    const [rating, setRating] = useState(currentRating || 0);

    const handleRate = async (newRating) => {
        setRating(newRating);
        try {
            const response = await axios.put(`http://localhost:8080/api/media/${media.id}/rating?rating=${newRating}`);
            alert("Thanks for rating!");
            if (onRateSuccess) onRateSuccess(response.data);
        } catch (err){
            console.error("Failed to rate:", err);
            alert("Failed to submit rating! Please check if your Spring Boot backend has been restarted since adding the rating endpoint.");
        }
    };

    return (
         <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRate(star)}
          style={{
            fontSize: "24px",
            color: star <= rating ? "#ffc107" : "#e4e5e9" 
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
export default RateMedia;