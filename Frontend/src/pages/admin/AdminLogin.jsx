import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminLogin.css";
import logo from "../../assets/logo3.png";
import API from "../../api/axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/admin/login",
        formData
      );

      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      navigate("/admin/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Invalid Admin Credentials"
      );
    }
  };

  return (
    <div className="adminLoginContainer">
      <div className="adminLoginCard">

        <div className="logoWrapper">
          <center>
          <img
            src={logo}
            alt="Eventify Logo"
            className="adminLogo"
          />
          </center>
        </div>

        <h1>Admin Portal</h1>

        <p>
          Welcome to the Admin Portal! Please sign in to
          access the Eventify Dashboard.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="inputGroup">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Password</label>

            <div className="passwordWrapper">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="eyeIcon"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="adminLoginBtn"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;