import { useState } from "react";
import "../App.css";

const Events = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Events Data
  const eventsData = [
    {
      id: 1,
      title: "Tech Innovation Summit 2026",
      date: "25 June 2026",
      venue: "Ahmedabad Convention Center",
      host: "Open Future Tech Community",
      description:
        "Join us for workshops, networking, coding challenges, and expert sessions.",
    },

    {
      id: 2,
      title: "AI & Robotics Expo",
      date: "10 July 2026",
      venue: "Gujarat Science City",
      host: "AI Research Club",
      description:
        "Explore the future of Artificial Intelligence and Robotics with live demos.",
    },

    {
      id: 3,
      title: "GTU Hackathon 2026",
      date: "18 August 2026",
      venue: "Nirma University",
      host: "Code Masters",
      description:
        "24-hour coding competition with exciting prizes and internship opportunities.",
    },
  ];

  // Separate Form Data for Each Event
  const [formData, setFormData] = useState({});

  // Handle Input Change
  const handleChange = (e, eventId) => {
    setFormData({
      ...formData,
      [eventId]: {
        ...formData[eventId],
        [e.target.name]: e.target.value,
      },
    });
  };

  // Handle Registration
  const handleRegister = async (e, eventId, eventTitle) => {
    e.preventDefault();

    const userData = formData[eventId];

    console.log(userData);

    try {
      await fetch("http://localhost:5000/api/events/register-event", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...userData,
          eventName: eventTitle,
        }),
      });

      // Success Popup
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Clear Current Form
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
    <div className="event-container">
      <div className="events-grid">
        {eventsData.map((event) => (
          <div className="event-card" key={event.id}>
            <h1>{event.title}</h1>

            <p>
              <strong>Date:</strong> {event.date}
            </p>

            <p>
              <strong>Venue:</strong> {event.venue}
            </p>

            <p>
              <strong>Host:</strong> {event.host}
            </p>

            <p>{event.description}</p>

            {/* Registration Form */}
            <form
              className="event-form"
              onSubmit={(e) => handleRegister(e, event.id, event.title)}
            >
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData[event.id]?.name || ""}
                onChange={(e) => handleChange(e, event.id)}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData[event.id]?.email || ""}
                onChange={(e) => handleChange(e, event.id)}
                required
              />

              <input
                type="text"
                name="branch"
                placeholder="Enter Your Branch"
                value={formData[event.id]?.branch || ""}
                onChange={(e) => handleChange(e, event.id)}
                required
              />

              <button type="submit">Register Event</button>
            </form>
          </div>
        ))}
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="success-popup">
          Event Registration Done Successfully ✅ <br />
          Confirmation Email Sent 📧
        </div>
      )}
    </div>
  );
};

export default Events;
