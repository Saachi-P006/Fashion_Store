import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ResultsGrid({ results }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (results && results.length > 0) {
      setProducts(results);
    } else {
      // fallback: fetch from backend if no results passed
      fetch("http://127.0.0.1:5000/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [results]);

  if (!products || products.length === 0) {
    return <h2>No products found</h2>;
  }

  return (
    <div className="results-grid">
      {products.map((item, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </div>
  );
}

export default ResultsGrid;
