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
            Discover and manage campus events,
            hackathons, workshops,
            cultural festivals and sports
            activities all in one place.
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

        <img
          src={eventHero}
          className="heroImage"
          alt="Event Illustration"
        />

      </div>
    </>
  );
}

export default Home;