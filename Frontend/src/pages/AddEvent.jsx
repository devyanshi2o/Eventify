import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createEvent } from "../services/eventService";
import AdminLayout from "../layout/AdminLayout";

import "./AdminDashboard.css";
import "./AddEvent.css";

function AddEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: "",
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEvent(formData);

      alert("Event Created Successfully");

      navigate("/admin/events");
    } catch (error) {
      console.log(error);
      alert("Failed To Create Event");
    }
  };

  return (
    <AdminLayout>
      <div className="dashboardContent">
        <div className="addEventContainer">
          <h1>Create New Event</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Workshop">Workshop</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Sports">Sports</option>
              <option value="Cultural">Cultural</option>
              <option value="Seminar">Seminar</option>
              <option value="Bootcamp">Bootcamp</option>
              <option value="Training">Training</option>
            </select>

            <button type="submit">
              Create Event
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddEvent;