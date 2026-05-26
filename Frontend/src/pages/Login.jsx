import { useState } from "react";

import Navbar from "../components/Navbar";

import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import logo from "../assets/logo3.png";

function Login() {

  const navigate = useNavigate();

  // FORM DATA

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // PASSWORD TOGGLE

  const [showPassword, setShowPassword] =
    useState(false);

  // SUCCESS POPUP

  const [showPopup, setShowPopup] =
    useState(false);


  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // HANDLE LOGIN

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/users/login",
        formData
      );

      const data = response.data;

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

          {/* TITLE */}

          <h1 className="authTitle">
            User Login
          </h1>

          <p className="formText">

            Welcome back! Please login to continue.

          </p>


          {/* FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="inputGroup">

              <label>
                Email
              </label>

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

              <label>
                Password
              </label>

              <div className="passwordBox">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  placeholder="Enter your password"

                  value={formData.password}

                  onChange={handleChange}

                  required
                />

                <span
                  className="eyeIcon"
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


            {/* FORGOT PASSWORD */}

            <p className="forgotText">
              Forgot Password?
            </p>


            {/* BUTTON */}

            <button
              className="authBtn"
              type="submit"
            >

              Login

            </button>

          </form>


          {/* BOTTOM */}

          <p className="bottomText">

            Don't have an account?

            <Link to="/register">
              {" "}
              Register
            </Link>

          </p>

        </div>

      </div>


      {/* POPUP */}

      {
        showPopup && (

          <div className="success-popup">

            Login Successful ✅

          </div>
        )
      }

    </>
  );
}

export default Login;