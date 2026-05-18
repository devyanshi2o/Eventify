import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logoSection">
        <img src={logo} alt="Eventify Logo" />

        <div>
          <h2>Eventify</h2>
          <p>Bringing Events Your Way</p>
        </div>
      </div>

      <div className="navLinks">
        <Link to="/">Home</Link>
        {/* <Link to="/login">Login</Link>
        <Link to="/register">Register</Link> */}
        <Link to="/events">Events</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

    </nav>
  );
}

export default Navbar;