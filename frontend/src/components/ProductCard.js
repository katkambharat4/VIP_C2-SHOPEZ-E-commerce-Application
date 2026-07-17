import React from "react";
import { addToCart } from "../api/api";

function ProductCard({ product }) {
  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      {/* 🖼️ IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* NAME */}
      <h3 style={{ margin: "10px 0" }}>{product.name}</h3>

      {/* PRICE */}
      <p style={{ color: "green", fontWeight: "bold" }}>
        ₹{product.price}
      </p>

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        style={{
          background: "#ff9900",
          border: "none",
          padding: "10px",
          width: "100%",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add to Cart 🛒
      </button>
    </div>
  );
}

export default ProductCard;