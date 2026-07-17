import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auth/register", form);

      alert("Registered Successfully ✅");

      navigate("/login");

    } catch (err) {

      console.log(err);
      alert("Registration Failed");

    }
  };


  return (

    <div
      style={{
        padding:"30px",
        display:"flex",
        justifyContent:"center",
      }}
    >

      <form
        onSubmit={handleSubmit}
        style={{
          width:"350px",
          padding:"25px",
          border:"1px solid #ddd",
          borderRadius:"10px",
        }}
      >

        <h2>
          Register 📝
        </h2>


        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />


        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />


        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />


        <button
          type="submit"
          style={{
            width:"100%",
            padding:"10px",
            background:"#2874f0",
            color:"white",
            border:"none",
            borderRadius:"5px",
          }}
        >
          Register
        </button>


      </form>

    </div>

  );
}


const inputStyle = {
  width:"100%",
  padding:"10px",
  marginBottom:"15px",
};


export default Register;