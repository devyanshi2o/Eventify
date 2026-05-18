import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Login() {

  // Form Data State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Popup State
  const [showPopup, setShowPopup] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    // Show Data In Console
    console.log(formData);

    // Show Popup
    setShowPopup(true);

    // Hide Popup After 3 Seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Clear Form
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar />

      <div className="authContainer">

        <div className="formBox">

          <h2>Welcome Back 👋</h2>

          <p className="formText">
            Login to explore and manage campus events,
            hackathons, workshops and more.
          </p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button className="authBtn" type="submit">
              Login
            </button>

          </form>

          <p className="bottomText">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>

      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="success-popup">
          Login Successful ✅
        </div>
      )}
    </>
  );
}

export default Login;