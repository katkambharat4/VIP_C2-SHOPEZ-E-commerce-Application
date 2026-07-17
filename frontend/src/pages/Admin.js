import React, { useState } from "react";
import axios from "axios";

function Admin() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    countInStock: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const addProduct = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/products",
        form
      );


      alert("Product added successfully ✅");


      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        countInStock: "",
      });


    } catch(err){

      console.log(err);

    }

  };


  return (

    <div
      style={{
        padding:"30px",
        background:"#f5f5f5",
        minHeight:"100vh"
      }}
    >

      <h1>
        Admin Dashboard 👨‍💼
      </h1>


      {/* CARDS */}

      <div
        style={{
          display:"flex",
          gap:"20px",
          marginBottom:"30px"
        }}
      >

        <div
          style={cardStyle}
        >
          📦
          <h3>Add Products</h3>
          <p>Create new products</p>
        </div>


        <div
          style={cardStyle}
        >
          🚚
          <h3>Orders</h3>
          <p>Manage deliveries</p>
        </div>


        <div
          style={cardStyle}
        >
          👥
          <h3>Users</h3>
          <p>Customer details</p>
        </div>


      </div>



      {/* ADD PRODUCT */}

      <div
        style={{
          background:"white",
          padding:"25px",
          width:"400px",
          borderRadius:"10px",
        }}
      >

        <h2>
          Add Product ➕
        </h2>


        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />


        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />


        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          style={inputStyle}
        />


        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        />


        <input
          name="countInStock"
          placeholder="Stock"
          value={form.countInStock}
          onChange={handleChange}
          style={inputStyle}
        />


        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={inputStyle}
        />


        <button
          onClick={addProduct}
          style={{
            width:"100%",
            padding:"12px",
            background:"#2874f0",
            color:"white",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer"
          }}
        >
          Add Product
        </button>


      </div>


    </div>

  );
}



const inputStyle = {
  width:"100%",
  padding:"10px",
  marginBottom:"12px",
};


const cardStyle = {
  background:"white",
  padding:"20px",
  width:"200px",
  borderRadius:"10px",
  boxShadow:"0 2px 8px #ccc",
};


export default Admin;