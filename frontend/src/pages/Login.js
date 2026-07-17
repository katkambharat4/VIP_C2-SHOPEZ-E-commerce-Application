import "../styles/form.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const loginUser = async () => {

    try {

      const { data } = await API.post("/auth/login", {
        email,
        password,
      });


      console.log("Login Response:", data);


      localStorage.setItem("token", data.token);


      console.log(
        "Saved Token:",
        localStorage.getItem("token")
      );


      alert("Login Success 🚀");


      // ✅ HOME PAGE KI REDIRECT
      navigate("/");


    } catch (error) {

      console.log(
        "Login Error:",
        error.response?.data || error.message
      );

      alert("Login Failed");

    }

  };


  return (

    <div className="form-container">

      <h2>
        Login
      </h2>


      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      <button onClick={loginUser}>
        Login
      </button>


    </div>

  );

}


export default Login;