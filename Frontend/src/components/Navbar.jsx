import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo3.png";

function Navbar() {

  const navigate = useNavigate();

  // USER + ADMIN

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    localStorage.removeItem("admin");

    localStorage.removeItem("adminToken");

    navigate("/login");
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

        <Link to="/events">
          Events
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>

      </div>


      {/* RIGHT */}

      <div className="navRight">

        {/* USER WELCOME */}

        {
          user && !admin && (

            <p className="welcomeText">

              Welcome, {user.name} 👋

            </p>

          )
        }


        {/* ADMIN PANEL */}

        {
          admin && (

            <>

              <p className="welcomeText">

                Admin Panel 👑

              </p>

              <Link
                to="/admin/dashboard"
                className="dashboardBtn"
              >

                Dashboard

              </Link>

            </>

          )
        }


        {/* LOGIN BUTTONS */}

        {
          !user && !admin ? (

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


              {/* ADMIN LOGIN */}

              <Link to="/admin/login">

                <button className="dashboardBtn">

                  Admin

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

          )
        }

      </div>

    </nav>
  );
}

export default Navbar;