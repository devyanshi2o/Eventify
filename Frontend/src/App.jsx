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

import About from "./pages/About";

import AdminLogin from "./pages/AdminLogin";

import AdminDashboard from "./pages/AdminDashboard";

import AddEvent from "./pages/AddEvent";

import EditEvent from "./pages/EditEvent";

import EventsPage from "./pages/EventsPage";

import Registrations from "./pages/Registrations";

import ProtectedRoute from "./components/ProtectedRoute";

import Users from "./pages/Users";

import AddUser from "./pages/AddUser";

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
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
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

        {/* <Route 
           path="/logout" 
           element={<Logout />} 
        /> */}

        <Route
          path="/about"
          element={<About />}
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
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/events"
          element={<EventsPage />}
        />

        <Route
          path="/admin/registrations"
          element={<Registrations />}
        />

        <Route
          path="/admin/users"
          element={<Users />}
        />

        <Route
          path="/admin/add-user"
          element={<AddUser />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;