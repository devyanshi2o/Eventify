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

      const response = await API.post(
        "/users/login",
        formData
      );

      const data = response.data;

      console.log(data);

      if (data.success) {

        localStorage.setItem(
          "token",
          data.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.data)
        );

        setShowPopup(true);

        setTimeout(() => {

          navigate("/");

        }, 1500);

      } else {

        alert(data.message);
      }

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