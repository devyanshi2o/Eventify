import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logoSection">
        <img src={logo} alt="Eventify Logo" />

        <div>
          <h2>Eventify</h2>
          <p>Bringing Events Together</p>
        </div>
      </div>

      <div className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

    </nav>
  );
}

export default Navbar;