import React from "react";
import "./ProductCard.css";

function ProductCard({ item }) {
  return (
    <div className="product-card">
      <div className="card-image">
        <img src={item.image} alt={item.name} />
        <span className="category-badge">{item.category}</span>
      </div>

      <div className="card-info">
        <h3 className="product-name">{item.name}</h3>
        {item.brand && <p className="brand-name">{item.brand}</p>}
        <p className="price">₹{item.price}</p>

        {item.rating && (
          <p className="rating">
            {"★".repeat(Math.round(item.rating))}{" "}
            {"☆".repeat(5 - Math.round(item.rating))}
          </p>
        )}

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="view-btn"
          >
            View Product
          </a>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
