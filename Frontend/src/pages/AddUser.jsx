import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

import "./AddUser.css";

function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
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
      // Backend API will come later

      console.log("New User:", formData);

      alert("User added successfully!");

      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      alert("Failed to add user");
    }
  };

  return (
    <AdminLayout>
      <div className="addUserContainer">
        <h1>Add New User</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit">
            Add User
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddUser;