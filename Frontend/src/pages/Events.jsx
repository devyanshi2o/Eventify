import { useEffect, useState } from "react";

import "../App.css";

import Navbar from "../components/Navbar";

function Events() {

  const [events, setEvents] =
    useState([]);

  const [showPopup, setShowPopup] =
    useState(false);

  const [formData, setFormData] =
    useState({});


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


  // HANDLE INPUT CHANGE
  const handleChange = (
    e,
    eventId
  ) => {

    setFormData({

      ...formData,

      [eventId]: {

        ...formData[eventId],

        [e.target.name]:
          e.target.value,
      },
    });
  };


  // HANDLE REGISTRATION
  const handleRegister = async (
    e,
    eventId,
    eventTitle
  ) => {

    e.preventDefault();

    const userData =
      formData[eventId];

    try {

      await fetch(
        "http://localhost:5000/api/events/register-event",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            ...userData,

            eventName:
              eventTitle,
          }),
        }
      );

      setShowPopup(true);

      setTimeout(() => {

        setShowPopup(false);

      }, 3000);

      setFormData({

        ...formData,

        [eventId]: {

          name: "",

          email: "",

          branch: "",
        },
      });

    } catch (error) {

      console.log(error);
    }
  };


  return (

    <>
      <Navbar />

      <div className="event-container">

        <div className="events-grid">

          {
            Array.isArray(events) &&
            events.map((event) => (

              <div
                className="event-card"
                key={event._id}
              >

                <h1>
                  {event.title}
                </h1>

                <p>
                  <strong>📅 Date:</strong>
                  {" "}
                  {event.date}
                </p>

                <p>
                  <strong>⏰ Time:</strong>
                  {" "}
                  {event.time}
                </p>

                <p>
                  <strong>📍 Location:</strong>
                  {" "}
                  {event.location}
                </p>

                <p>
                  <strong>🏷️ Category:</strong>
                  {" "}
                  {event.category}
                </p>

                <p className="event-description">
                  {event.description}
                </p>


                {/* REGISTRATION FORM */}

                <form
                  className="event-form"

                  onSubmit={(e) =>
                    handleRegister(
                      e,
                      event._id,
                      event.title
                    )
                  }
                >

                  <input
                    type="text"

                    name="name"

                    placeholder="Enter Your Name"

                    value={
                      formData[event._id]
                        ?.name || ""
                    }

                    onChange={(e) =>
                      handleChange(
                        e,
                        event._id
                      )
                    }

                    required
                  />


                  <input
                    type="email"

                    name="email"

                    placeholder="Enter Your Email"

                    value={
                      formData[event._id]
                        ?.email || ""
                    }

                    onChange={(e) =>
                      handleChange(
                        e,
                        event._id
                      )
                    }

                    required
                  />


                  <input
                    type="text"

                    name="branch"

                    placeholder="Enter Your Branch"

                    value={
                      formData[event._id]
                        ?.branch || ""
                    }

                    onChange={(e) =>
                      handleChange(
                        e,
                        event._id
                      )
                    }

                    required
                  />


                  <button type="submit">

                    Register Event

                  </button>

                </form>

              </div>
            ))
          }

        </div>


        {/* SUCCESS POPUP */}

        {
          showPopup && (

            <div className="success-popup">

              Event Registration
              Successful ✅

            </div>
          )
        }

      </div>
    </>
  );
}

export default Events;