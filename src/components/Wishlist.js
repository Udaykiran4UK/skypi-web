// src/components/Wishlist.js

import React from 'react';
import './Wishlist.css';

const wishlistItems = [
  {
    id: 1,
    title: "UX Design",
    location: "Work from Home",
    image: "https://via.placeholder.com/100", // Placeholder for item image
  },
  {
    id: 2,
    title: "Prototyping",
    location: "Work from Home",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    title: "UI Design",
    location: "Work from Home",
    image: "https://via.placeholder.com/100",
  },
];

function Wishlist() {
  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.title} className="item-image" />
            <div className="item-details">
              <h2 className="item-title">{item.title}</h2>
              <p className="item-location">
                <span role="img" aria-label="location">📍</span>
                {item.location}
              </p>
            </div>
            <button className="apply-button">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
