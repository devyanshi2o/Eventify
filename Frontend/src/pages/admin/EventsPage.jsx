import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layout/AdminLayout";
import API from "../../api/axios";

import "./EventsPage.css";

function EventsPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");

      console.log("Events API:", response.data);

      setEvents(response.data || []);
    } catch (error) {
      console.error(
        "Error fetching events:",
        error
      );
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <AdminLayout>
      <div className="eventsPage">

        {/* Header */}

        <div className="eventsHeader">

          <div>
            <h1>Events</h1>
            <p>
              Manage all your events
              in one place
            </p>
          </div>

          <button
            className="createBtn"
            onClick={() =>
              navigate(
                "/admin/create-event"
              )
            }
          >
            + Create Event
          </button>

        </div>

        {/* Stats */}

        <div className="eventStats">

          <div className="statCard">
            <h3>{events.length}</h3>
            <p>Total Events</p>
          </div>

          <div className="statCard">
            <h3>
              {
                events.filter(
                  (event) =>
                    new Date(
                      event.date
                    ) > new Date()
                ).length
              }
            </h3>

            <p>Upcoming Events</p>
          </div>

          <div className="statCard">
            <h3>
              {
                events.filter(
                  (event) =>
                    new Date(
                      event.date
                    ) < new Date()
                ).length
              }
            </h3>

            <p>Completed Events</p>
          </div>

        </div>

        {/* Events Table */}

        <div className="tableContainer">

          {loading ? (
            <div className="emptyState">
              Loading events...
            </div>
          ) : events.length === 0 ? (
            <div className="emptyState">
              No Events Found
            </div>
          ) : (
            <table>

              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Registrations</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {events.map((event) => (

                  <tr key={event._id}>

                    <td>
                      {event.title}
                    </td>

                    <td>
                      {event.date
                        ? new Date(
                            event.date
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      {event.venue ||
                        "-"}
                    </td>

                    <td>
                      {event
                        .registrations
                        ?.length || 0}
                    </td>

                    <td>

                      <span
                        className={
                          new Date(
                            event.date
                          ) >
                          new Date()
                            ? "status upcoming"
                            : "status completed"
                        }
                      >
                        {new Date(
                          event.date
                        ) > new Date()
                          ? "Upcoming"
                          : "Completed"}
                      </span>

                    </td>

                    <td>

                      <button
                        className="viewBtn"
                      >
                        View
                      </button>

                      <button
                        className="editBtn"
                      >
                        Edit
                      </button>

                      <button
                        className="deleteBtn"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </AdminLayout>
  );
}

export default EventsPage;