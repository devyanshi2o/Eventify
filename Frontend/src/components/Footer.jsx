import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footerContainer">

        <div className="footerSection">

          <h2>Eventify</h2>

          <p>
            Bringing campus events together through hackathons,
            workshops, festivals and sports activities.
          </p>

        </div>

        <div className="footerSection">
            <h3>Quick Links</h3>

                <a href="/">Home</a>
                <a href="/events">Events</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
                <a href="/admin/login">Admin Login</a>
        </div>

        <div className="footerSection">

          <h3>Event Categories</h3>

          <p>Hackathons</p>

          <p>Workshops</p>

          <p>Cultural Festivals</p>

          <p>Sports Events</p>

        </div>

        <div className="footerSection">

          <h3>Contact</h3>

          <p>eventify@gmail.com</p>

        </div>

      </div>

      <div className="footerBottom">
        © 2026 Eventify | Bringing Events Together
      </div>

    </footer>
  );
}

export default Footer;