import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  createEvent
} from "../services/eventService";

import "./AdminDashboard.css";
import "./AddEvent.css";

function AddEvent() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      image: ""

    });


  // INPUT CHANGE

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // LOGOUT

  const handleLogout = () => {

    // Remove admin login only

    localStorage.removeItem(
      "adminToken"
    );

    // Redirect to home page

    navigate(
      "/"
    );

  };


  // SUBMIT

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createEvent(
          formData
        );

        alert(
          "Event Created Successfully"
        );

        navigate(
          "/admin/events"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Failed To Create Event"
        );

      }

    };


  return (

    <div className="dashboardLayout">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2 className="logo">

          Eventify

        </h2>


        <ul className="sidebarMenu">

          <li>

            <Link
              to="/admin/dashboard"
            >

              Dashboard

            </Link>

          </li>


          <li>

            <Link
              to="/admin/events"
            >

              Events

            </Link>

          </li>


          <li
            className="active"
          >

            <Link
              to="/admin/add-event"
            >

              Create Event

            </Link>

          </li>


          <li>

            <Link
              to="/admin/registrations"
            >

              Registrations

            </Link>

          </li>


          <li
            onClick={
              handleLogout
            }
          >

            Logout

          </li>

        </ul>

      </div>


      {/* CONTENT */}

      <div className="dashboardContent">

        <div className="addEventContainer">

          <h1>

            Create New Event

          </h1>


          <form
            onSubmit={
              handleSubmit
            }
          >

            <input

              type="text"

              name="title"

              placeholder=
              "Event Title"

              value=
              {formData.title}

              onChange=
              {handleChange}

              required

            />


            <textarea

              name=
              "description"

              placeholder=
              "Event Description"

              value=
              {formData.description}

              onChange=
              {handleChange}

              required

            />


            <input

              type="date"

              name="date"

              value=
              {formData.date}

              onChange=
              {handleChange}

              required

            />


            <input

              type="time"

              name="time"

              value=
              {formData.time}

              onChange=
              {handleChange}

              required

            />


            <input

              type="text"

              name=
              "location"

              placeholder=
              "Location"

              value=
              {formData.location}

              onChange=
              {handleChange}

              required

            />


            <select

              name=
              "category"

              value=
              {formData.category}

              onChange=
              {handleChange}

              required

            >

              <option value="">

                Select Category

              </option>

              <option>

                Workshop

              </option>

              <option>

                Hackathon

              </option>

              <option>

                Sports

              </option>

              <option>

                Cultural

              </option>

              <option>

                Seminar

              </option>

              <option>

                Bootcamp

              </option>

              <option>

                Training

              </option>

            </select>


            <button
              type="submit"
            >

              Create Event

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddEvent;