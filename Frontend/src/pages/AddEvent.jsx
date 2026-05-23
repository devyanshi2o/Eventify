import { useState } from "react";

import { useNavigate } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";

import { createEvent } from "../services/eventService";

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
    image: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createEvent(formData);

      alert("Event Created Successfully");

      navigate("/admin/dashboard");

    } catch (error) {

      console.log(error);

      alert("Failed To Create Event");
    }
  };

  return (

    <>
      <AdminNavbar />

      <div className="addEventPage">

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

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            {/* <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            /> */}

            <button type="submit">
              Create Event
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddEvent;