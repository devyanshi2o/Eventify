import {

  BrowserRouter,

  Routes,

  Route,

} from "react-router-dom";

import Home from "./pages/Home";

import Events from "./pages/Events";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Contact from "./pages/Contact";

import AdminDashboard from "./pages/AdminDashboard";

import AddEvent from "./pages/AddEvent";

import EditEvent from "./pages/EditEvent";

import AdminLogin from "./pages/AdminLogin";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/events"
          element={<Events />}
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
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/add-event"
          element={<AddEvent />}
        />

        <Route
          path="/admin/edit-event/:id"
          element={<EditEvent />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;