// components/AdminSidebar.jsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import bottomImage from "../assets/bottomimage.png";

function AdminSidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    navigate("/");
  };

  return (
    <div className="sidebar">

      <h2 className="logo">
        Eventify
      </h2>

      <ul className="sidebarMenu">

        <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        <li className={location.pathname === "/admin/events" ? "active" : ""}>
          <Link to="/admin/events">Events</Link>
        </li>

        <li className={location.pathname === "/admin/add-event" ? "active" : ""}>
          <Link to="/admin/add-event">Create Event</Link>
        </li>

        <li className={location.pathname === "/admin/users" ? "active" : ""}>
          <Link to="/admin/users">Users</Link>
        </li>

        <li className={location.pathname === "/admin/registrations" ? "active" : ""}>
          <Link to="/admin/registrations">Registrations</Link>
        </li>

        <li onClick={handleLogout}>
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
  );
}

export default AdminSidebar;