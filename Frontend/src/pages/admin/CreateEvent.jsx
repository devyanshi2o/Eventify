import { useState } from "react";
import "./CreateEvent.css";
import {
  FaInfoCircle,
  FaUsers,
  FaCalendarAlt,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

import AdminLayout from "../../layout/AdminLayout";
import API from "../../api/axios";
import calendarImg from "../../assets/calendar.png";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    registrationLimit: "",
    registrationStartDate: "",
    registrationDeadline: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    organizerName: "",
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
        "/events",
        formData
      );

      console.log("Event Created:", response.data);

      alert("Event created successfully!");

      setFormData({
        title: "",
        category: "",
        description: "",
        registrationLimit: "",
        registrationStartDate: "",
        registrationDeadline: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        venue: "",
        organizerName: "",
      });

    } catch (error) {
      console.error(
        "Create Event Error:",
        error.response?.data || error.message
      );

      alert("Failed to create event");
    }
  };

  return (
    <AdminLayout>
      <div className="createEventPage">

        <div className="pageHeader">
          <h1>Create Event</h1>
          <p>Create and publish a new event</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Top Row */}

          <div className="topGrid">

            <div className="card">
              <div className="cardTitle">
                <FaInfoCircle />
                <h3>Event Information</h3>
              </div>

              <div className="formGroup">
                <label>Event Name</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event name"
                />
              </div>

              <div className="formGroup">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select category
                  </option>
                  <option value="Technical">
                    Technical
                  </option>
                  <option value="Cultural">
                    Cultural
                  </option>
                  <option value="Workshop">
                    Workshop
                  </option>
                  <option value="Sports">
                    Sports
                  </option>
                  <option value="Seminar">
                    Seminar
                  </option>
                  <option value="BootCamp">
                    BootCamp
                  </option>
                </select>
              </div>

              <div className="formGroup">
                <label>Description</label>
                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter event description"
                />
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">
                <FaUsers />
                <h3>Registration Settings</h3>
              </div>

              <div className="formGroup">
                <label>Registration Limit</label>
                <input
                  type="number"
                  name="registrationLimit"
                  value={formData.registrationLimit}
                  onChange={handleChange}
                  placeholder="Enter registration limit"
                />
              </div>

              <div className="formGroup">
                <label>
                  Registration Start Date
                </label>
                <input
                  type="date"
                  name="registrationStartDate"
                  value={
                    formData.registrationStartDate
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label>
                  Registration Deadline
                </label>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={
                    formData.registrationDeadline
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>

          {/* Schedule */}

          <div className="card fullCard">
            <div className="cardTitle">
              <FaCalendarAlt />
              <h3>Schedule & Venue</h3>
            </div>

            <div className="scheduleGrid">

              <div className="formGroup">
                <label>Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label>Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Enter venue"
                />
              </div>

            </div>
          </div>

          {/* Bottom Row */}

          <div className="bottomGrid">

            <div className="card">
              <div className="cardTitle">
                <FaUser />
                <h3>Organizer Details</h3>
              </div>

              <div className="formGroup">
                <label>Organizer Name</label>
                <input
                  type="text"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleChange}
                  placeholder="Enter organizer name"
                />
              </div>
            </div>

            <div className="card summaryCard">
              <div className="cardTitle">
                <FaClipboardList />
                <h3>Event Summary</h3>
              </div>

              <div className="summaryContent">

                <img
                  src={calendarImg}
                  alt="Calendar"
                  className="calendarImage"
                />

                <p>
                  Once you submit the event,
                  it will appear in the Events
                  page and become available
                  for registrations.
                </p>

              </div>
            </div>

          </div>

          {/* Buttons */}

          <div className="buttonGroup">

            <button
              type="button"
              className="cancelBtn"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submitBtn"
            >
              Submit Event
            </button>

          </div>

        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateEvent;