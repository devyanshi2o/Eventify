import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Logout from "./components/Logout";

function App() {

  return (

    <BrowserRouter>

      {/* GLOBAL NAVBAR */}
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/logout"
          element={<Logout />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;