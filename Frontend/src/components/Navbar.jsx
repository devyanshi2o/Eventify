import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo3.png";

function Navbar() {

  const navigate =
    useNavigate();

  // GET USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // CHECK ADMIN
  const isAdmin =
    user?.email ===
    "admin@gmail.com";

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (

    <nav className="navbar">

      {/* LOGO SECTION */}

      <div className="logoSection">

        <img
          src={logo}
          alt="Eventify Logo"
        />

        <div>

          <h2>Eventify</h2>

          <p>
            Bringing Events
            Your Way
          </p>

        </div>

      </div>


      {/* NAV LINKS */}

      <div className="navLinks">

        <Link to="/">
          Home
        </Link>

        <Link to="/events">
          Events
        </Link>

        <Link to="/contact">
          Contact Us
        </Link>


        {/* ADMIN LINKS */}

        {
          isAdmin && (
            <>
              <Link to="/admin/add-event">
                Add Event
              </Link>

              <Link to="/admin/dashboard">
                Dashboard
              </Link>
            </>
          )
        }


        {/* LOGIN / LOGOUT */}

        {
          !user ? (

            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>

          ) : (

            <button
              onClick={
                handleLogout
              }

              className="logoutBtn"
            >

              Logout

            </button>
          )
        }

      </div>

    </nav>
  );
}

export default Navbar;