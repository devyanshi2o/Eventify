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

import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/admin/AdminLogin";

import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

import EventsPage from "./pages/admin/EventsPage";

import CreateEvent from "./pages/admin/CreateEvent";

import Registrations from "./pages/admin/Registrations";

import Users from "./pages/admin/Users";
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

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminProtectedRoute>
              <EventsPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/create-event"
          element={
            <AdminProtectedRoute>
              <CreateEvent />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/registrations"
          element={
            <AdminProtectedRoute>
              <Registrations />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <Users />
            </AdminProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;