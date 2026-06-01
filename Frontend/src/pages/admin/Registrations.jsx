import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import API from "../../api/axios";

import {
  FaUsers,
  FaSearch,
  FaEye,
  FaDownload,
} from "react-icons/fa";

import "./Registrations.css";

function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const fetchRegistrations = async () => {
    try {
      const response = await API.get(
        "/events/registrations"
      );

      console.log(
        "Registrations API:",
        response.data
      );

      setRegistrations(
        response.data.data || []
      );
    } catch (error) {
      console.error(
        "Error fetching registrations:",
        error
      );

      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const filteredRegistrations =
    Array.isArray(registrations)
      ? registrations.filter((reg) =>
        (
          reg.studentName || ""
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )
      : [];

  //View Registration
  const handleViewRegistration = (
    registration
  ) => {
    setSelectedRegistration(
      registration
    );

    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="registrationsPage">

        {/* Header */}

        <div className="pageHeader">
          <h1>Registrations</h1>
          <p>
            Manage event registrations
          </p>
        </div>

        {/* Stats */}

        <div className="statsGrid">

          <div className="statCard">
            <FaUsers />

            <div>
              <h2>
                {registrations.length}
              </h2>

              <p>
                Total Registrations
              </p>
            </div>

          </div>

        </div>

        {/* Search */}

        <div className="searchContainer">

          <FaSearch />

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* Table */}

        <div className="tableContainer">

          <table>

            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Event</th>
                <th>Registration Date</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="5">
                    Loading...
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    No Registrations Found
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map(
                  (
                    registration
                  ) => (
                    <tr
                      key={
                        registration._id
                      }
                    >
                      <td>
                        {registration.studentName}
                      </td>

                      <td>
                        {registration.email}
                      </td>

                      <td>
                        {registration.eventName}
                      </td>

                      <td>
                        {registration.createdAt
                          ? new Date(
                            registration.createdAt
                          ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <span className="status">
                          Registered
                        </span>
                      </td>

                      <td>

                        <button
                          className="actionBtn"
                          onClick={() =>
                            handleViewRegistration(
                              registration
                            )
                          }
                        >
                          <FaEye />
                        </button>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
      {
        showModal &&
        selectedRegistration && (
          <div
            className="modalOverlay"
            onClick={() =>
              setShowModal(false)
            }
          >
            <div
              className="registrationModal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <h2>
                Registration Details
              </h2>

              <p>
                <strong>
                  Student:
                </strong>{" "}
                {
                  selectedRegistration.studentName
                }
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {
                  selectedRegistration.email
                }
              </p>

              <p>
                <strong>
                  Event:
                </strong>{" "}
                {
                  selectedRegistration.eventName
                }
              </p>

              <p>
                <strong>
                  Registered On:
                </strong>{" "}
                {selectedRegistration.createdAt
                  ? new Date(
                    selectedRegistration.createdAt
                  ).toLocaleString()
                  : "-"}
              </p>

              <button
                className="closeBtn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Close
              </button>

            </div>
          </div>
        )
      }
    </AdminLayout>
  );
}

export default Registrations;