import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch("/api/reviews?n=5")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(console.error);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, rating: parseInt(rating), review }),
    })
      .then((res) => res.text())
      .then((text) => {
        setResponse(text);
        setName("");
        setRating("");
        setReview("");
        return fetch("/api/reviews?n=5");
      })
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => setResponse("An error occurred: " + err));
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.name}</strong> rated{" "}
            <strong>{review.rating}/5</strong>
            <p>{review.review}</p>
            <small>{new Date(review.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <h3>Submit a Review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label>Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default Reviews;
