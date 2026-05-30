import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaCalendarAlt,
    FaUserPlus,
    FaUsers,
    FaShieldAlt,
    FaPen,
    FaTrash,
} from "react-icons/fa";

import API from "../../api/axios";
import AdminLayout from "../../layout/AdminLayout";
import adminImage from "../../assets/adminImage.png";

import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState([
        {
            title: "Total Events",
            value: 0,
            icon: <FaCalendarAlt />,
            color: "purple",
        },
        {
            title: "Total Registrations",
            value: 0,
            icon: <FaUserPlus />,
            color: "blue",
        },
        {
            title: "Total Users",
            value: 0,
            icon: <FaUsers />,
            color: "green",
        },
        {
            title: "Admins",
            value: 0,
            icon: <FaShieldAlt />,
            color: "orange",
        },
    ]);

    const [recentEvents, setRecentEvents] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const eventsRes = await API.get("/events");

            const events = eventsRes.data || [];

            const totalRegistrations = events.reduce(
                (sum, event) =>
                    sum + (event.registrations?.length || 0),
                0
            );

            setStats([
                {
                    title: "Total Events",
                    value: events.length,
                    icon: <FaCalendarAlt />,
                    color: "purple",
                },
                {
                    title: "Total Registrations",
                    value: totalRegistrations,
                    icon: <FaUserPlus />,
                    color: "blue",
                },
                {
                    title: "Total Users",
                    value: totalRegistrations,
                    icon: <FaUsers />,
                    color: "green",
                },
                {
                    title: "Admins",
                    value: 1,
                    icon: <FaShieldAlt />,
                    color: "orange",
                },
            ]);

            setRecentEvents(events.slice(0, 5));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/events/${id}`);

            fetchDashboardData();
        } catch (error) {
            console.log(error);
            alert("Failed to delete event");
        }
    };

 return (
  <AdminLayout>
    <div className="dashboardContainer">

      {/* HEADER */}

      <div className="dashboardTopBar">
        <h1>Admin Dashboard</h1>

        <div className="adminInfo">
          <div className="adminProfile">
            <img
              src={adminImage}
              alt="Admin"
            />
            <span>Admin</span>
          </div>
        </div>
      </div>

      {/* OVERVIEW */}

      <h2 className="sectionTitle">
        Dashboard Overview
      </h2>

      <div className="statsGrid">
        {stats.map((item, index) => (
          <div className="statCard" key={index}>
            <div
              className={`statIcon ${item.color}`}
            >
              {item.icon}
            </div>

            <div>
              <p>{item.title}</p>
              <h3>{item.value}</h3>
              <span>All Time</span>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT EVENTS */}

      <div className="eventsSection">

        <div className="eventsHeader">
          <h2>Recent Events</h2>

          <button
            onClick={() =>
              navigate("/admin/events")
            }
          >
            View All
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Registrations</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {recentEvents.length > 0 ? (

              recentEvents.map((event) => (
                <tr key={event._id}>
                  <td>
                    {event.title || event.name}
                  </td>

                  <td>
                    {event.date
                      ? new Date(
                          event.date
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    {event.registrations?.length || 0}
                  </td>

                  <td>

                    <button
                      className="editBtn"
                      onClick={() =>
                        navigate(
                          `/admin/events/edit/${event._id}`
                        )
                      }
                    >
                      <FaPen />
                    </button>

                    <button
                      className="deleteBtn"
                      onClick={() =>
                        handleDelete(event._id)
                      }
                    >
                      <FaTrash />
                    </button>

                  </td>
                </tr>
              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No events found
                </td>
              </tr>

            )}

          </tbody>
        </table>

      </div>

    </div>
  </AdminLayout>
);
}

export default AdminDashboard;