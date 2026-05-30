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

// import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

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

        {/* <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        /> */}

      </Routes>

    </BrowserRouter>
  );
}

export default App;