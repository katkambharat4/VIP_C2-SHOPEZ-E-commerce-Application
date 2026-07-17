import React, { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  placeOrder,
} from "../api/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // 📦 fetch cart
  const fetchCart = async () => {
    const res = await getCart();
    setCartItems(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ❌ remove
  const handleRemove = async (id) => {
    await removeFromCart(id);
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ➕ increase
  const handleIncrease = async (id) => {
    await increaseQty(id);
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ➖ decrease
  const handleDecrease = async (id) => {
    await decreaseQty(id);
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 💰 total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 📦 place order
  const handlePlaceOrder = async () => {
    try {
      const products = cartItems.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      }));

      await placeOrder(products, total);

      alert("Order placed successfully 🎉");

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>

          {cartItems.map((item) => (

            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
                margin: "10px 0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >

              {/* 🖼️ IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />


              <div>

                <h4>{item.name}</h4>

                <p>
                  ₹{item.price}
                </p>


                {/* QUANTITY */}
                <div>

                  <button onClick={() => handleDecrease(item._id)}>
                    -
                  </button>


                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>


                  <button onClick={() => handleIncrease(item._id)}>
                    +
                  </button>

                </div>

              </div>


              {/* REMOVE */}
              <button
                onClick={() => handleRemove(item._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>


            </div>

          ))}


          <h3>
            Total: ₹{total}
          </h3>


          <button
            onClick={handlePlaceOrder}
            style={{
              background: "green",
              color: "white",
              padding: "10px",
              border: "none",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Place Order 📦
          </button>

        </>
      )}

    </div>
  );
}

export default Cart;