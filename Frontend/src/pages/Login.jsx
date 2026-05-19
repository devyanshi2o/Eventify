import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

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
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // API CALL
      const response = await API.post(
        "/users/login",
        formData
      );

      console.log(response.data);

      // Save Token
      localStorage.setItem(
        "token",
        response.data.data.token
      );

      // Save User Data
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );

      // Show Popup
      setShowPopup(true);

      // Clear Form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect After 2 Seconds
      setTimeout(() => {

        setShowPopup(false);

        navigate("/");

      }, 2000);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
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

            <button
              className="authBtn"
              type="submit"
            >
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