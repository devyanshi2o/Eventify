import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/Logo3.png";

import "./AdminNavbar.css";

function AdminNavbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    navigate("/admin/login");
  };

  return (

    <nav className="adminNavbar">

      {/* LOGO SECTION */}
      <div className="adminLogoSection">

        <img
          src={logo}
          alt="Eventify Logo"
          className="adminLogoImg"
        />

        <div className="adminLogoText">

          <h2>Eventify Admin</h2>

          <p>Manage Events Easily</p>

        </div>

      </div>

      {/* NAV LINKS */}
      <div className="adminLinks">

        <Link to="/admin/dashboard">
          Dashboard
        </Link>

        <Link to="/admin/add-event">
          Add Event
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default AdminNavbar;