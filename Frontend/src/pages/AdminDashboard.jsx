import { useEffect, useState } from "react";

import { getEvents } from "../services/eventService";

import "./AdminDashboard.css";

import AdminLayout from "../layout/AdminLayout";

function AdminDashboard() {

  const [events, setEvents] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [registrations, setRegistrations] = useState([]);
  const [admins, setAdmins] = useState([]);

  // FETCH EVENTS

  const fetchEvents = async () => {
    try {

      const res = await getEvents();

      setEvents(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH REGISTRATIONS

  const fetchRegistrations = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/events/registrations"
      );

      const data = await response.json();

      setRegistrations(data.data || data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH USERS

  const fetchUsers = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/users"
      );

      const data = await response.json();

      setTotalUsers(data.data.length);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH ADMINS

  const fetchAdmins = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/admins"
      );

      const data = await response.json();

      setAdmins(data.data || data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchEvents();
    fetchRegistrations();
    fetchUsers();
    fetchAdmins();

  }, []);

  return (

    <AdminLayout>

      <h1>Admin Dashboard</h1>

      <div className="overviewCards">

        <div className="overviewCard">

          <h3>Total Events</h3>

          <p>{events.length}</p>

        </div>

        <div className="overviewCard">

          <h3>Registrations</h3>

          <p>{registrations.length}</p>

        </div>

        <div className="overviewCard">

          <h3>Users</h3>

          <p>{totalUsers}</p>

        </div>

        <div className="overviewCard">

          <h3>Admins</h3>

          <p>{admins.length}</p>

        </div>

      </div>

    </AdminLayout>

  );
}

export default AdminDashboard;