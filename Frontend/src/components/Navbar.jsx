import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo3.png";

function Navbar() {

  const navigate =
    useNavigate();

  // USER

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )

    );

  // ADMIN TOKEN

  const adminToken =

    localStorage.getItem(
      "adminToken"
    );


  // LOGOUT

  const handleLogout =
    () => {

    // USER

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    // ADMIN

    localStorage.removeItem(
      "admin"
    );

    localStorage.removeItem(
      "adminToken"
    );

    navigate("/");

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

        {/* USER */}

        {

        user && !adminToken && (

        <p
        className=
        "welcomeText"
        >

          Welcome,
          {
            user.username
          }

        </p>

        )

        }


        {/* ADMIN */}

        {

        adminToken && (

        <>

          <p
          className=
          "welcomeText"
          >

            Admin Panel 👑

          </p>


          <Link

          to="/admin/dashboard"

          className=
          "dashboardBtn"

          >

            Dashboard

          </Link>

        </>

        )

        }


        {/* LOGIN */}

        {

        !user && !adminToken ?

        (

        <div
        className=
        "authButtons"
        >

          <Link
          to="/login"
          >

            <button
            className=
            "loginBtnNav"
            >

              Login

            </button>

          </Link>


          <Link
          to="/register"
          >

            <button
            className=
            "registerBtnNav"
            >

              Register

            </button>

          </Link>


          <Link
          to="/admin/login"
          >

            <button
            className=
            "dashboardBtn"
            >

              Admin

            </button>

          </Link>

        </div>

        )

        :

        (

        <button

        onClick={
          handleLogout
        }

        className=
        "logoutBtn"

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