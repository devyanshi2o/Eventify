import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { Link } from "react-router-dom";

import heroBg from "../assets/heroimage.png";

import {
  FaCalendarAlt,
  FaTicketAlt,
  FaStar
} from "react-icons/fa";

function Home() {

  // USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // STATES

  const [events, setEvents] =
    useState([]);

  const [registeredEvents, setRegisteredEvents] =
    useState([]);


  // FETCH EVENTS

  const fetchEvents = async () => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/events"
        );

      const data =
        await response.json();

      setEvents(data.data || data);

    } catch (error) {

      console.log(error);

    }
  };


  // FETCH REGISTERED EVENTS

  const fetchRegisteredEvents = async () => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/events/registrations"
        );

      const data =
        await response.json();

      setRegisteredEvents(
        data.data || data
      );

    } catch (error) {

      console.log(error);

    }
  };


  // FETCH DATA

  useEffect(() => {

    fetchEvents();

    fetchRegisteredEvents();

  }, []);


  // UPCOMING EVENTS

  const upcomingEvents =
    events.filter((event) => {

      return (
        new Date(event.date) >
        new Date()
      );

    });


  return (

    <>
      <Navbar />

      <section
        className="heroSection"
        style={{
          backgroundImage:
            `linear-gradient(
              rgba(0,0,0,0.72),
              rgba(0,0,0,0.72)
            ),
            url(${heroBg})`
        }}
      >

        <div className="heroOverlay">

          {/* BEFORE LOGIN */}

          {
            !user ? (

              <div className="homeContent">

                <p className="smallText">
                  Discover. Connect. Experience.
                </p>

                <h1>
                  Amazing Events <br />
                  Around You
                </h1>

                <p className="heroDescription">
                  Find and join exciting events happening near you.
                  Learn, network and grow together.
                </p>

                <div className="buttons">

                  <Link to="/login">

                    <button className="loginBtn">
                      Login
                    </button>

                  </Link>

                  <Link to="/register">

                    <button className="registerBtn">
                      Register
                    </button>

                  </Link>

                </div>

              </div>

            ) : (

              // AFTER LOGIN

              <div className="loggedHero">

                {/* HERO CONTENT */}

                <div className="homeContent">

                  <h1 className="welcomeHeading">

                    Welcome,
                    <br />
                    {user.name}

                  </h1>

                  <p className="heroDescription">

                    Explore exciting events and make the most
                    of every moment.

                  </p>

                  <Link to="/events">

                    <button className="exploreBtn">

                      Explore Events

                    </button>

                  </Link>

                </div>


                {/* STATS */}

                <div className="statsContainer">

                  <div className="statCard">

                    <FaCalendarAlt className="statIcon" />

                    <h2>
                      {registeredEvents.length}
                    </h2>

                    <p>
                      Events Registered
                    </p>

                  </div>


                  <div className="statCard">

                    <FaTicketAlt className="statIcon" />

                    <h2>
                      {upcomingEvents.length}
                    </h2>

                    <p>
                      Upcoming Events
                    </p>

                  </div>


                  <div className="statCard">

                    <FaStar className="statIcon" />

                    <h2>
                      {events.length}
                    </h2>

                    <p>
                      Events Available
                    </p>

                  </div>

                </div>


                {/* UPCOMING EVENTS */}

                <div className="dashboardSection">

                  <div className="sectionHeader">

                    <h2>
                      Upcoming Events
                    </h2>

                    <Link to="/events">
                      View All
                    </Link>

                  </div>


                  <div className="dashboardEventsGrid">

                    {
                      upcomingEvents
                        .slice(0, 3)
                        .map((event) => (

                          <div
                            className="dashboardEventCard"
                            key={event._id}
                          >

                            <div className="eventCardTop">

                              <span className="eventCategory">

                                {event.category}

                              </span>

                            </div>

                            <div className="dashboardEventContent">

                              <h3>
                                {event.title}
                              </h3>

                              <p>
                                📅 {event.date}
                              </p>

                              <p>
                                📍 {event.location}
                              </p>

                              <Link to="/events">

                                <button>
                                  Register Now
                                </button>

                              </Link>

                            </div>

                          </div>
                        ))
                    }

                  </div>

                </div>


                {/* REGISTERED EVENTS */}

                <div className="dashboardSection">

                  <div className="sectionHeader">

                    <h2>
                      My Registered Events
                    </h2>

                  </div>

                  <div className="dashboardEventsGrid">

                    {
                      registeredEvents.length > 0 ? (

                        registeredEvents
                          .slice(0, 3)
                          .map((registered) => {

                            const matchedEvent =
                              events.find(
                                (event) =>
                                  event.title ===
                                  registered.eventName
                              );

                            return (

                              <div
                                className="dashboardEventCard"
                                key={registered._id}
                              >

                                <div className="eventCardTop">

                                  <span className="eventCategory">

                                    {
                                      matchedEvent?.category ||
                                      "Campus Event"
                                    }

                                  </span>

                                </div>

                                <div className="dashboardEventContent">

                                  <h3>
                                    {registered.eventName}
                                  </h3>

                                  <p>
                                    📅 {
                                      matchedEvent?.date ||
                                      "Coming Soon"
                                    }
                                  </p>

                                  <p>
                                    📍 {
                                      matchedEvent?.location ||
                                      "Location TBA"
                                    }
                                  </p>

                                  <button className="registeredBtn">

                                    Registered

                                  </button>

                                </div>

                              </div>
                            );
                          })

                      ) : (

                        <div className="emptyState">

                          <h3>
                            No Registered Events Yet
                          </h3>

                          <p>
                            Start exploring campus events.
                          </p>

                          <Link to="/events">

                            <button className="exploreBtn">

                              Explore Events

                            </button>

                          </Link>

                        </div>
                      )
                    }

                  </div>

                </div>

              </div>

            )
          }

        </div>

      </section>

    </>
  );
}

export default Home;