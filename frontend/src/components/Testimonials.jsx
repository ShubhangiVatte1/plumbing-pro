import React, { useState } from "react";

export default function Testimonials() {
  const [reviews, setReviews] = useState([
    {
      name: "Rahul Sharma",
      rating: 5,
      text: "Excellent service. Very fast and affordable!",
    },
    {
      name: "Priya Singh",
      rating: 4,
      text: "Good plumber. Fixed leakage quickly.",
    },
  ]);

  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const labels = {
    1: "Terrible",
    2: "Bad",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };

  const handleSubmit = () => {
    if (!name || !text || rating === 0) {
      alert("Please fill all fields");
      return;
    }

    const newReview = {
      name,
      rating,
      text,
    };

    setReviews([newReview, ...reviews]);

    // reset
    setName("");
    setText("");
    setRating(0);
  };

  return (
    <section className="testimonials">
      <h2>⭐ Customer Reviews</h2>

      {/* ⭐ ADD REVIEW FORM */}
      <div className="review-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Write your review"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* ⭐ STAR RATING */}
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                fontSize: "28px",
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
              }}
            >
              ★
            </span>
          ))}
        </div>

        {rating > 0 && <p>{labels[rating]}</p>}

        <button onClick={handleSubmit}>Submit Review</button>
      </div>

      {/* ⭐ SHOW REVIEWS */}
      <div className="review-container">
        {reviews.map((r, index) => (
          <div key={index} className="review-card">
            <p>{"★".repeat(r.rating)}</p>
            <p>{r.text}</p>
            <h4>- {r.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}