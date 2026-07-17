import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api/api";

function AdminOrders() {

  const [orders, setOrders] = useState([]);


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


  const changeStatus = async (id, status) => {
    try {

      await updateOrderStatus(id, status);

      alert("Status Updated ✅");

      loadOrders();

    } catch (err) {
      console.log(err);
    }
  };


  return (

    <div style={{ padding:"20px" }}>

      <h1>
        Admin Orders 📦
      </h1>


      {orders.map((order)=>(

        <div
          key={order._id}
          style={{
            border:"1px solid #ddd",
            padding:"20px",
            marginBottom:"15px",
            borderRadius:"10px"
          }}
        >

          <h3>
            Order ID: {order._id.slice(-6)}
          </h3>


          <p>
            Total: ₹{order.totalPrice}
          </p>


          <p>
            Current Status:
            <b> {order.status}</b>
          </p>


          <select
            onChange={(e)=>
              changeStatus(
                order._id,
                e.target.value
              )
            }
            value={order.status}
            style={{
              padding:"10px",
              marginTop:"10px"
            }}
          >

            <option value="Ordered">
              Ordered
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Out for Delivery">
              Out for Delivery
            </option>

            <option value="Delivered">
              Delivered
            </option>

          </select>


        </div>

      ))}


    </div>

  );
}


export default AdminOrders;