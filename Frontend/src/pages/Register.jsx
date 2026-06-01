import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "../App.css";
import registerImg from "../assets/eventHero.png";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function Register() {

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      enrollmentNo: "",
      collegeName: "",
      branch: "",
      semester: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showPopup, setShowPopup] =
    useState(false);

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // REGISTER

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.post(
          "/users/register",
          formData
        );

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.data
        )
      );

      setShowPopup(true);

      setFormData({
        username: "",
        email: "",
        password: "",
        enrollmentNo: "",
        collegeName: "",
        branch: "",
        semester: "",
      });

      setTimeout(() => {

        window.location.href = "/";

      }, 1500);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="registerPage">

        <div className="registerCard">

          {/* LEFT SIDE */}

          <div className="registerLeft">
            <img
              src={registerImg}
              alt="Event Illustration"
              className="registerIllustration"
            />
          </div>
          {/* RIGHT SIDE */}

          <div className="registerRight">

            <h1 className="registerTitle">
              Create Account
            </h1>

            <p className="registerSubtitle">
              Start your Eventify journey today
            </p>

            <form onSubmit={handleRegister}>

              <div className="registerGrid">

                <div className="registerInputGroup">
                  <label>Full Name</label>
                  <input
                    className="registerInput"
                    type="text"
                    name="username"
                    placeholder="Enter your name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="registerInputGroup">
                  <label>Email</label>
                  <input
                    className="registerInput"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="registerInputGroup">
                  <label>Enrollment No</label>
                  <input
                    className="registerInput"
                    type="text"
                    name="enrollmentNo"
                    placeholder="Enrollment Number"
                    value={formData.enrollmentNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="registerInputGroup">
                  <label>College Name</label>
                  <input
                    className="registerInput"
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    value={formData.collegeName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="registerInputGroup">
                  <label>Branch</label>
                  <input
                    className="registerInput"
                    type="text"
                    name="branch"
                    placeholder="Branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="registerInputGroup">
                  <label>Semester</label>

                  <select
                    className="registerSelect"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Semester
                    </option>

                    {[1, 2, 3, 4, 5, 6, 7, 8].map(
                      (sem) => (
                        <option
                          key={sem}
                          value={sem}
                        >
                          Semester {sem}
                        </option>
                      )
                    )}
                  </select>
                </div>

              </div>

              {/* PASSWORD */}

              <div className="registerPassword">

                <label>Password</label>

                <div className="registerPasswordBox">

                  <input
                    className="registerInput"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <span
                    className="registerEye"
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

              <button
                className="registerSubmit"
                type="submit"
              >
                Create Account
              </button>

            </form>

            <p className="registerBottomText">

              Already have an account?

              <Link to="/login">
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

      {showPopup && (
        <div className="success-popup">
          Registration Successful ✅
        </div>
      )}
    </>
  );
}

export default Register;