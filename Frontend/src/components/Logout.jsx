// components/Logout.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  useEffect(() => {

    // Remove Token
    localStorage.removeItem("token");

    // Remove User Data
    localStorage.removeItem("user");

    // Redirect to Login Page
    navigate("/login");

  }, [navigate]);

  return (
    <div className="logout-page">

      <h2>Logging Out...</h2>

    </div>
  );
}

export default Logout;