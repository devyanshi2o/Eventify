// Contact.jsx

import { useState } from "react";
import "../App.css";
import API from "../api/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API CALL
      const response = await API.post("/contact/send", formData);

      console.log(response.data);

      // Success Popup
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Clear Form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to Send Message");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1>Contact Us</h1>

        <p className="contact-text">
          Have questions about events or registrations? Feel free to contact us.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="success-popup">Message Sent Successfully ✅</div>
      )}
    </div>
  );
};

export default Contact;
