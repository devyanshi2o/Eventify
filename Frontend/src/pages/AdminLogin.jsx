import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import logo from "../assets/Logo3.png";

import "../App.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (response.ok) {

        // SAVE TOKEN
        localStorage.setItem(
          "adminToken",
          data.data.token
        );

        // SAVE ADMIN DATA
        localStorage.setItem(
          "admin",
          JSON.stringify(data.data)
        );

        // OPTIONAL ADMIN CHECK
        // if(data.data.role !== "admin"){
        //   alert("Access Denied");
        //   return;
        // }

        navigate("/admin/dashboard");

      } else {

        alert(
          data.message ||
          "Login Failed"
        );
      }

    } catch (error) {

      console.log(error);

      alert("Admin Login Failed");
    }
  };

  return (
    <>
      <div className="adminLoginPage">

        <div className="adminLoginCard">

          {/* TITLE */}
          <h1>
            Admin Login
          </h1>

          <p className="adminSubText">

            Welcome Admin! Please login to
            access dashboard.

          </p>

          {/* FORM */}
          <form
            className="adminLoginForm"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}
            <div className="adminInputGroup">

              <label>
                Email
              </label>

              <input
                type="email"

                name="email"

                placeholder="Enter admin email"

                value={formData.email}

                onChange={handleChange}

                required
              />

            </div>

            {/* PASSWORD */}
            <div className="adminInputGroup">

              <label>
                Password
              </label>

              <div className="adminPasswordBox">

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
                  className="adminEyeIcon"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {
                    showPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                  }

                </span>

              </div>

            </div>

            {/* FORGOT */}
            <p className="forgotAdmin">

              Forgot Password?

            </p>

            {/* BUTTON */}
            <button type="submit">

              Login

            </button>

          </form>

          {/* USER LOGIN */}
          <p className="adminBottomText">

            Not an admin?

            <Link to="/login">

              User Login

            </Link>

          </p>

        </div>

      </div>
    </>
  );
}

export default AdminLogin;