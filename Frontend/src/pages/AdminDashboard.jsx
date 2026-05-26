import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  getEvents,
  deleteEvent,
} from "../services/eventService";

import "./AdminDashboard.css";

import bottomImage from "../assets/bottomimage.png";

function AdminDashboard() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [events, setEvents] =
    useState([]);

  const [registrations, setRegistrations] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [admins, setAdmins] =
    useState([]);


  // FETCH EVENTS

  const fetchEvents =
    async () => {

      try {

        const res =
          await getEvents();

        setEvents(
          res.data
        );

      } catch (error) {

        console.log(
          error
        );

      }
    };


  // FETCH REGISTRATIONS

  const fetchRegistrations =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/events/registrations"
          );

        const data =
          await response.json();

        setRegistrations(
          data.data || data
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };


  // FETCH USERS

  const fetchUsers =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/users"
          );

        const data =
          await response.json();

        setUsers(
          data.data || data
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };


  // FETCH ADMINS

  const fetchAdmins =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/admins"
          );

        const data =
          await response.json();

        setAdmins(
          data.data || data
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };


  useEffect(() => {

    fetchEvents();

    fetchRegistrations();

    fetchUsers();

    fetchAdmins();

  }, []);


  // DELETE EVENT

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this event?"
        );

      if (
        !confirmDelete
      ) return;

      try {

        await deleteEvent(
          id
        );

        fetchEvents();

      } catch (error) {

        console.log(
          error
        );

      }
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


  return (

    <div className="dashboardLayout">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2 className="logo">

          Eventify

        </h2>


        <ul className="sidebarMenu">

          <li
            className={
              location.pathname ===
                "/admin/dashboard"

                ? "active"

                : ""
            }
          >

            <Link
              to="/admin/dashboard"
            >

              Dashboard

            </Link>

          </li>


          <li
            className={
              location.pathname ===
                "/admin/events"

                ? "active"

                : ""
            }
          >

            <Link
              to="/admin/events"
            >

              Events

            </Link>

          </li>


          <li
            className={
              location.pathname ===
                "/admin/add-event"

                ? "active"

                : ""
            }
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

        <div className="sidebarBottomImage">

          <img
            src={bottomImage}
            alt="Event Illustration"
            className="sidebarImg"
          />

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="dashboardContent">

        <h1>

          Admin Dashboard

        </h1>


        <div className="overviewCards">

          <div className="overviewCard">

            <h3>

              Total Events

            </h3>

            <p>

              {
                events.length
              }

            </p>

          </div>


          <div className="overviewCard">

            <h3>

              Registrations

            </h3>

            <p>

              {
                registrations.length
              }

            </p>

          </div>


          <div className="overviewCard">

            <h3>

              Users

            </h3>

            <p>

              {
                users.length
              }

            </p>

          </div>


          <div className="overviewCard">

            <h3>

              Admins

            </h3>

            <p>

              {
                admins.length
              }

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;