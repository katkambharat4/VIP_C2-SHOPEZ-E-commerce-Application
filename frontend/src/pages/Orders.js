import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data } = await getOrders();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const trackOrder = (order) => {
    setSelectedOrder(order);
  };


  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>

      <h1>My Orders 📦</h1>


      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >

            {/* ORDER HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >

              <div>

                <h3>
                  Order ID: {order._id.slice(-6)}
                </h3>


                <p>
                  📅 Ordered Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>


                <p>
                  🚚 Status:
                  <b style={{ color: "green" }}>
                    {" "}{order.status}
                  </b>
                </p>

              </div>


              <button
                onClick={() => trackOrder(order)}
                style={{
                  background: "#2874f0",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Track Order 🚚
              </button>

            </div>


            <hr />


            <h3>Products</h3>


            {/* PRODUCT CARDS */}
            {order.products.map((item, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  background: "#fafafa",
                }}
              >

                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />


                <div>

                  <h3>
                    {item.product?.name}
                  </h3>


                  <p>
                    Price: ₹{item.product?.price}
                  </p>


                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>


              </div>

            ))}


            <h3>
              Total Amount: ₹{order.totalPrice}
            </h3>


          </div>

        ))
      )}



      {/* TRACK ORDER POPUP */}

      {selectedOrder && (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <div
            style={{
              background: "white",
              width: "350px",
              padding: "25px",
              borderRadius: "10px",
            }}
          >

            <h2>
              Track Order 🚚
            </h2>


            <p>
              Order ID: {selectedOrder._id.slice(-6)}
            </p>


            <hr />


            <h3>Delivery Status</h3>


            <p>✅ Ordered</p>


            <p>
              {
                selectedOrder.status === "Shipped" ||
                selectedOrder.status === "Out for Delivery" ||
                selectedOrder.status === "Delivered"
                  ? "✅ Shipped"
                  : "⏳ Shipped"
              }
            </p>


            <p>
              {
                selectedOrder.status === "Out for Delivery" ||
                selectedOrder.status === "Delivered"
                  ? "✅ Out for Delivery"
                  : "⏳ Out for Delivery"
              }
            </p>


            <p>
              {
                selectedOrder.status === "Delivered"
                  ? "✅ Delivered"
                  : "⏳ Delivered"
              }
            </p>


            <button
              onClick={() => setSelectedOrder(null)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Close
            </button>


          </div>

        </div>

      )}


    </div>
  );
}

export default Orders;