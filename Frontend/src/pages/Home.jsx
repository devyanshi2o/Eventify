import Navbar from "../components/Navbar";
import eventHero from "../assets/eventHero.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home">
        <div className="homeContent">
          <h1>Eventify</h1>

          <h2>Bringing Events Together</h2>

          <p>
            Discover and manage campus events, hackathons, workshops, cultural
            festivals and sports activities all in one place.
          </p>

          <div className="buttons">
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>

        <img src={eventHero} className="heroImage" alt="Event Illustration" />
      </div>

      {/* FOOTER */}

      <footer className="footer">
        <div className="footerContent">
          <h2>Eventify</h2>

          <p>
            Bringing campus events, hackathons, workshops and festivals
            together.
          </p>

          {/* <div className="footerLinks">

            <Link to="/">Home</Link>

            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>

            <Link to="/contact">Contact</Link>

          </div> */}

          <p className="copyright">© 2026 Eventify. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
