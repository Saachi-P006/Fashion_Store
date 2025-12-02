import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ setResults, allProducts, gender, setGender }) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]); // [min, max]

  const categories = ["Dress", "Shoes", "Jacket", "Bag", "Jewellery", "T-shirt"];

  useEffect(() => {
    let filtered = allProducts || [];

    // Filter by gender
    if (gender) {
      filtered = filtered.filter(
        (item) => item.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    // Filter by search query
    if (query.trim() !== "") {
      filtered = filtered.filter((item) =>
        (item.name || "").toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by selected categories
    if (categoryFilter.length > 0) {
      filtered = filtered.filter((item) =>
        categoryFilter.includes(item.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setResults(filtered);
  }, [query, categoryFilter, priceRange, gender, allProducts, setResults]);

  // Handlers
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setCategoryFilter((s) => [...s, value]);
    else setCategoryFilter((s) => s.filter((cat) => cat !== value));
  };

  const handleSwitchGender = () => {
    setGender(gender === "women" ? "men" : "women");
  };

  return (
    <nav className={`navbar ${gender === "women" ? "women-section" : "men-section"}`}>
      {/* Search Box */}
      <div className="search-container">
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map((cat) => (
          <label
            className={`pill ${categoryFilter.includes(cat) ? "selected" : ""}`}
            key={cat}
          >
            <input
              type="checkbox"
              value={cat}
              checked={categoryFilter.includes(cat)}
              onChange={handleCategoryChange}
            />
            <span className="pill-text">{cat}</span>
          </label>
        ))}
      </div>

      {/* Price Filter */}
      <div className="price-filter" style={{ marginTop: "12px", textAlign: "center" }}>
        <label>Price: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "6px" }}>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
        </div>
      </div>

      {/* Switch Gender Button */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button className="switch-gender-btn" onClick={handleSwitchGender}>
          Switch to {gender === "women" ? "Men" : "Women"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
