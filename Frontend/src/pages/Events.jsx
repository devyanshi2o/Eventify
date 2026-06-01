import { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";

function Events() {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // FETCH EVENTS

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/events"
      );

      const data = await res.json();

      setEvents(data.data || data);
    } catch (error) {
      console.log(error);
    }
  };

  // REGISTER EVENT

  const handleRegister = async (
    eventId,
    eventTitle
  ) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events/register-event",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId: user?._id,

            studentName:
              user?.username,

            email:
              user?.email,

            enrollmentNo:
              user?.enrollmentNo,

            collegeName:
              user?.collegeName,

            branch:
              user?.branch,

            semester:
              user?.semester,

            eventId,
            eventName:
              eventTitle,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="eventPage">

        {/* HEADING */}

        <div className="eventHeading">

          <h1>
            Explore Campus Events
          </h1>

          <p>
            Register for exciting
            hackathons, workshops,
            sports and cultural
            events.
          </p>

        </div>

        {/* EVENTS */}

        <div className="events-grid">

          {Array.isArray(events) &&
            events.map((event) => (

              <div
                className="event-card"
                key={event._id}
              >

                <div className="eventTop">

                  <span className="eventBadge">
                    {event.category}
                  </span>

                </div>

                <h2>
                  {event.title}
                </h2>

                <div className="eventInfo">

                  <p>
                    <FaCalendarAlt />
                    {event.date}
                  </p>

                  <p>
                    <FaClock />
                    {event.time}
                  </p>

                  <p>
                    <FaMapMarkerAlt />
                    {event.location}
                  </p>

                  <p>
                    <FaTag />
                    {event.category}
                  </p>

                </div>

                <p className="event-description">
                  {event.description}
                </p>

                <button
                  className="registerBtn"
                  onClick={() =>
                    handleRegister(
                      event._id,
                      event.title
                    )
                  }
                >
                  Register Now
                </button>

              </div>

            ))}

        </div>

        {/* SUCCESS POPUP */}

        {showPopup && (

          <div className="success-popup">

            Event Registered
            Successfully ✅

          </div>

        )}

      </div>
    </>
  );
}

export default Events;