import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to ShopEZ 🛍️</h1>

        <p>
          Buy the latest mobiles, laptops, shoes, watches and much more at the
          best prices.
        </p>

        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;