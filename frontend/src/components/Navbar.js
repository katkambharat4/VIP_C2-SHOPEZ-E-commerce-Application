import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../api/auth";
import { getCart } from "../api/api";
import "../styles/navbar.css";



function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = getToken();

  const [cartCount, setCartCount] = useState(0);

  // 🛒 Fetch cart count
  useEffect(() => {
  const fetchCart = async () => {
    const res = await getCart();
    setCartCount(res.data.length);
  };

  if (isLoggedIn) fetchCart();

  const update = () => {
    if (isLoggedIn) fetchCart();
  };

  window.addEventListener("cartUpdated", update);

  return () => window.removeEventListener("cartUpdated", update);
}, [isLoggedIn]);


  // 🚪 Logout
  const handleLogout = () => {
    logout();
    setCartCount(0);
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav>
      <h2>ShopEZ</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
<Link to="/profile">Profile 👤</Link>
        {isLoggedIn && (
          <>
            {/* 🛒 Cart with badge */}
            <div
              style={{
                display: "inline-block",
                position: "relative",
                marginRight: "15px",
              }}
            >
              <Link to="/cart">Cart</Link>

              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-12px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>

            <Link to="/orders">Orders</Link>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: "crimson",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;




