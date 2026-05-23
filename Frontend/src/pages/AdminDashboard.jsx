import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";

import {
  getEvents,
  deleteEvent,
} from "../services/eventService";

import "./AdminDashboard.css";

function AdminDashboard() {

  const [events, setEvents] =
    useState([]);


  // FETCH EVENTS

  const fetchEvents = async () => {

    try {

      const res =
        await getEvents();

      setEvents(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchEvents();

  }, []);


  // DELETE EVENT

  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?"
      );

    if (!confirmDelete) return;

    try {

      await deleteEvent(id);

      fetchEvents();

    } catch (error) {

      console.log(error);
    }
  };


  return (

    <>

      <AdminNavbar />


      {/* HERO SECTION */}

      <div className="dashboardHero">

        <div className="heroLeft">

          <h1>

            Manage Your Events
            Effortlessly.

          </h1>

          <p>

            Create, organize and
            manage all your campus
            events from one powerful
            admin dashboard. Track
            registrations, update
            event details and deliver
            unforgettable experiences.

          </p>

          <Link to="/admin/add-event">

            <button>

              Create New Event

            </button>

          </Link>

        </div>


        <div className="heroRight">

          <img
            src="/dashboardHero.png"
            alt="Dashboard Hero"
          />

        </div>

      </div>


      {/* DASHBOARD */}

      <div className="adminDashboard">

        {/* EVENT GRID */}

        <div className="adminEventsContainer">

          {
            events.map((event) => (

              <div
                className="adminEventCard"
                key={event._id}
              >

                {/* <img
                  src={event.image}
                  alt={event.title}
                /> */}


                <div className="eventInfo">

                  <h2>
                    {event.title}
                  </h2>

                  <p>
                    📅 {event.date}
                  </p>

                  <p>
                    ⏰ {event.time}
                  </p>

                  <p>
                    📍 {event.location}
                  </p>

                  <p>
                    📝 {event.description}
                  </p>
                </div>

                <div className="eventActions">

                  <Link
                    to={`/admin/edit-event/${event._id}`}
                  >

                    <button className="editBtn">

                      Edit

                    </button>

                  </Link>


                  <button
                    className="deleteBtn"

                    onClick={() =>
                      handleDelete(
                        event._id
                      )
                    }
                  >

                    Delete

                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </>
  );
}

export default AdminDashboard;