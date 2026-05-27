import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { getEvents, deleteEvent } from "../services/eventService";

import "./AdminDashboard.css";
import "./EventsPage.css";

function EventsPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  // FETCH EVENTS

  const fetchEvents = async () => {
    try {
      const res = await getEvents();

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // DELETE EVENT

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(id);

      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT

  const handleLogout = () => {
    // Remove admin login only

    localStorage.removeItem("adminToken");

    // Redirect to home page

    navigate("/");
  };

  // FILTER EVENTS

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title

      .toLowerCase()

      .includes(search.toLowerCase());

    const matchCategory = category === "All" || event.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="dashboardLayout">
      {/* SIDEBAR */}

      <div className="sidebar">
        <h2 className="logo">Eventify</h2>

        <ul className="sidebarMenu">
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>

          <li className="active">
            <Link to="/admin/events">Events</Link>
          </li>

          <li>
            <Link to="/admin/add-event">Create Event</Link>
          </li>

          <li>
            <Link to="/admin/registrations">Registrations</Link>
          </li>

          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      {/* CONTENT */}

      <div className="dashboardContent">
        <div className="eventsHeader">
          <div>
            <h1>Manage Events</h1>

            <p>View and manage campus events</p>
          </div>
        </div>

        {/* SEARCH + FILTER */}

        <div className="eventsFilters">
          <input
            type="text"
            placeholder="Search event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>

            <option>Workshop</option>

            <option>Hackathon</option>

            <option>Sports</option>

            <option>Cultural</option>
          </select>
        </div>

        {/* EVENTS GRID */}

        <div className="eventsGrid">
          {filteredEvents.map((event) => (
            <div className="eventCard" key={event._id}>
              <div className="eventTop">
                <span className="eventCategory">{event.category}</span>
              </div>

              <div className="eventContent">
                <h2>{event.title}</h2>

                <div className="eventInfo">
                  <div className="infoRow">
                    <span className="icon">📅</span>

                    <span>{event.date}</span>
                  </div>

                  <div className="infoRow">
                    <span className="icon">⏰</span>

                    <span>{event.time}</span>
                  </div>

                  <div className="infoRow">
                    <span className="icon">📍</span>

                    <span>{event.location}</span>
                  </div>

                  <div className="infoRow descriptionRow">
                    <span className="icon">📄</span>

                    <span className="description">{event.description}</span>
                  </div>
                </div>
              </div>

              <div className="eventActions">
                <Link to={`/admin/edit-event/${event._id}`}>
                  <button className="editBtn">Edit</button>
                </Link>

                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
