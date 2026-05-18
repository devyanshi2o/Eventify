import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <Navbar />

      <div className="authContainer">

        <div className="formBox">

          <h2>Create Account ✨</h2>

          <p className="formText">
            Join Eventify and explore exciting campus
            events, hackathons, workshops and festivals.
          </p>

          <input
            type="text"
            placeholder="Enter your full name"
          />

          <input
            type="email"
            placeholder="Enter your email"
          />

          <input
            type="password"
            placeholder="Create password"
          />

          <button className="authBtn">
            Register
          </button>

          <p className="bottomText">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </div>
    </>
  );
}

export default Register;