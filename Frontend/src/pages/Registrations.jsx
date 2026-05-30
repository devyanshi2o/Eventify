import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";

import "./AdminDashboard.css";
import "./Registrations.css";

function Registrations() {
  const [registrations, setRegistrations] = useState([]);

  // FETCH REGISTRATIONS
  const fetchRegistrations = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events/registrations"
      );

      const data = await response.json();

      console.log(data);

      setRegistrations(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <AdminLayout>
      <div className="dashboardContent">
        <h1>Event Registrations</h1>

        <div className="registrationTable">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {registrations.length > 0 ? (
                registrations.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.eventName}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    No registrations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Registrations;