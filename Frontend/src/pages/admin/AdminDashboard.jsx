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

  const [stats, setStats] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);


  useEffect(() => {
    fetchDashboardData();
  }, []);

 const fetchDashboardData = async () => {
  try {
    const [eventsRes, usersRes] = await Promise.all([
      API.get("/events"),
      API.get("/users"),
    ]);

    const events = eventsRes.data || [];
    const users = usersRes.data.data || [];

    // USERS COUNT

    const totalUsers = users.filter(
      (user) => user.role === "user"
    ).length;

    const totalAdmins = users.filter(
      (user) => user.role === "admin"
    ).length;

    // REGISTRATIONS COUNT

    const totalRegistrations = events.reduce(
      (total, event) =>
        total + (event.registrations?.length || 0),
      0
    );

    // RECENT EVENTS

    const recent = [...events]
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.date) -
          new Date(a.createdAt || a.date)
      )
      .slice(0, 5);

    // DASHBOARD STATS

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
        value: totalUsers,
        icon: <FaUsers />,
        color: "green",
      },
      {
        title: "Admins",
        value: totalAdmins,
        icon: <FaShieldAlt />,
        color: "orange",
      },
    ]);

    setRecentEvents(recent);

    console.log("Users:", users);
    console.log("Total Users:", totalUsers);
    console.log("Total Admins:", totalAdmins);

  } catch (error) {
    console.error("Dashboard Error:", error);
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
      console.error(error);
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
            <div
              className="statCard"
              key={index}
            >
              <div
                className={`statIcon ${item.color}`}
              >
                {item.icon}
              </div>

              <div className="statContent">
                <p>{item.title}</p>
                <h3>{item.value}</h3>
                {/* <span>All Time</span> */}
              </div>
            </div>
          ))}
        </div>

        {/* RECENT EVENTS */}

        <div className="eventsSection">
          <div className="eventsHeader">
            <h2>Recent Events</h2>

            <button
              className="viewAllBtn"
              onClick={() =>
                navigate("/admin/events")
              }
            >
              View All
            </button>
          </div>

          <div className="tableContainer">
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
                        {event.title ||
                          event.name}
                      </td>

                      <td>
                        {event.date
                          ? new Date(
                            event.date
                          ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>
                        {event.registrations
                          ?.length || 0}
                      </td>

                      <td className="actionButtons">
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
                            handleDelete(
                              event._id
                            )
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

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;