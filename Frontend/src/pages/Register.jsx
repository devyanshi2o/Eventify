import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../api/axios";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import logo from "../assets/logo3.png";

function Register() {
  // FORM DATA
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // PASSWORD TOGGLE
  const [showPassword, setShowPassword] = useState(false);

  // SUCCESS POPUP
  const [showPopup, setShowPopup] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/register", formData);

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem("token", response.data.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.data));

      // SHOW POPUP
      setShowPopup(true);

      // CLEAR FORM
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      // REDIRECT
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="authContainer">
        <div className="formBox">
          {/* TITLE */}
          <h1 className="authTitle">Create Account</h1>

          <p className="formText">
            Join Eventify and explore exciting events, workshops and festivals.
          </p>

          {/* FORM */}
          <form onSubmit={handleRegister}>
            {/* USERNAME */}
            <div className="inputGroup">
              <label>Full Name</label>

              <input
                type="text"
                name="username"
                placeholder="Enter your full name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="inputGroup">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="inputGroup">
              <label>Password</label>

              <div className="passwordBox">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="eyeIcon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <button className="authBtn" type="submit">
              Register
            </button>
          </form>

          {/* BOTTOM */}
          <p className="bottomText">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="success-popup">Registration Successful ✅</div>
      )}
    </>
  );
}

export default Register;
