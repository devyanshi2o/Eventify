import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import axios from "axios";

import {
  updateEvent
} from "../services/eventService";

import "./EditEvent.css";

function EditEvent() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    image: ""

  });

  useEffect(() => {

    fetchEvent();

  }, []);

  const fetchEvent = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/events/${id}`
      );

      setFormData(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateEvent(id, formData);

      alert("Event Updated Successfully");

      navigate("/admin/dashboard");

    } catch (error) {

      console.log(error);

      alert("Failed To Update Event");
    }
  };

  return (

    <>
      <AdminNavbar />

      <div className="editEventPage">

        <div className="editEventContainer">

          <h1>Edit Event</h1>

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
              value={formData.date?.split("T")[0]}
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
              placeholder="location"
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
              Update Event
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default EditEvent;