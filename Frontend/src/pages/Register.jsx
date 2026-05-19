import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
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

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // API CALL
      const response = await API.post("/users/register", formData);

      console.log(response.data);

      // Show Popup
      setShowPopup(true);

      // Save Token
      localStorage.setItem("token", response.data.data.token);

      // Hide Popup After 3 Seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Clear Form
      setFormData({
        name: "",
        email: "",
        password: "",
      });
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
          <h2>Create Account ✨</h2>

          <p className="formText">
            Join Eventify and explore exciting campus events, hackathons,
            workshops and festivals.
          </p>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button className="authBtn" type="submit">
              Register
            </button>
          </form>

          <p className="bottomText">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="success-popup">Registration Successful ✅</div>
      )}
    </>
  );
}

export default Register;
