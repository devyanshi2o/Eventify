import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo3.png";

function Navbar() {

  const navigate = useNavigate();

  // GET USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // TEMP ADMIN CHECK
  const isAdmin =
    user?.email ===
    "admin@gmail.com";

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

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

        {
          user && !isAdmin && (

            <p className="welcomeText">
              Welcome, {user.name} 👋
            </p>

          )
        }


        {
          isAdmin && (

            <>
              <Link
                to="/admin/dashboard"
                className="dashboardBtn"
              >
                Dashboard
              </Link>
            </>
          )
        }


        {
          !user ? (

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

          )
        }

      </div>

    </nav>
  );
}

export default Navbar;