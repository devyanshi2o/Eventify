import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Navbar />

      <div className="authContainer">

        <div className="formBox">

          <h2>Welcome Back 👋</h2>

          <p className="formText">
            Login to explore and manage campus events,
            hackathons, workshops and more.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button className="authBtn">
            Login
          </button>

          <p className="bottomText">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>

      </div>
    </>
  );
}

export default Login;