import {
  Link,
} from "react-router-dom";

import logo from "../assets/logo1.png";

function Navbar() {

  // USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (

    <nav className="navbar">

      {/* LEFT */}

      <div className="logoSection">

        <img
          src={logo}
          alt="Eventify Logo"
        />

        <h2>
          Eventify
        </h2>

      </div>

      {/* CENTER */}

      <div className="navLinks">

        <Link to="/">
          Home
        </Link>

        {user && (
          <Link to="/events">
            Events
          </Link>
        )}

        <Link to="/about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>

      </div>

      {/* RIGHT */}

      <div className="navRight">

        {/* USER */}

        {user && (

          <p className="welcomeText">

            Welcome, {user.username}

          </p>

        )}

        {/* LOGIN / REGISTER */}

        {!user ? (

          <div className="authButtons">

            <Link to="/login">

              <button className="loginBtnNav">
                Login
              </button>

            </Link>

            <Link to="/register">

              <button className="registerBtnNav">
                Register
              </button>

            </Link>

          </div>

        ) : (

          <button
            onClick={handleLogout}
            className="logoutBtn"
          >
            Logout
          </button>

        )}

      </div>

    </nav>

  );
}

export default Navbar;