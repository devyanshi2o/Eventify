import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../App.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:5000/api/users/login",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      if (!data.success) {

        alert(data.message);

        return;
      }

      // ADMIN CHECK
      if (
        data.data.email !==
        "admin@gmail.com"
      ) {

        alert(
          "Not Authorized As Admin"
        );

        return;
      }

      // SAVE TOKEN
      localStorage.setItem(
        "adminToken",

        data.data.token
      );

      navigate(
        "/admin/dashboard"
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="authContainer">

      <div className="formBox">

        <h2>Admin Login</h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="email"

            name="email"

            placeholder="Enter Admin Email"

            value={formData.email}

            onChange={handleChange}

            required
          />

          <input
            type="password"

            name="password"

            placeholder="Enter Password"

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

      </div>

    </div>
  );
}

export default AdminLogin;