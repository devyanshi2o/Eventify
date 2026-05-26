import { useEffect, useState } from "react";

import "../App.css";

import Navbar from "../components/Navbar";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTag
} from "react-icons/fa";

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

      const data =
        await res.json();

      setEvents(data.data || data);

    } catch (error) {

      console.log(error);
    }
  };


  // HANDLE INPUT

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


  // REGISTER EVENT

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

      <div className="eventPage">

        <div className="eventHeading">

          <h1>
            Explore Campus Events
          </h1>

          <p>
            Register for exciting hackathons,
            workshops, sports and cultural events.
          </p>

        </div>


        <div className="events-grid">

          {
            Array.isArray(events) &&

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


                {/* FORM */}

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

                    placeholder="Your Name"

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

                    placeholder="Your Email"

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

                    placeholder="Your Branch"

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

                    Register Now

                  </button>

                </form>

              </div>
            ))
          }

        </div>


        {/* POPUP */}

        {
          showPopup && (

            <div className="success-popup">

              Event Registered Successfully ✅

            </div>
          )
        }

      </div>
    </>
  );
}

export default Events;