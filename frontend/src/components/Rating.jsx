import React, { useState } from "react";

function Rating() {
  const [rating, setRating] = useState(0);

  const labels = {
    1: "Terrible",
    2: "Bad",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };

  return (
    <div>
      <h3>Customer Rating</h3>

      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            fontSize: "30px",
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
          }}
        >
          ★
        </span>
      ))}

      {rating > 0 && <p>{labels[rating]}</p>}
    </div>
  );
}

export default Rating;