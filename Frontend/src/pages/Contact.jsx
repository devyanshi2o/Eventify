import { useState } from "react";

import "../App.css";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import logo from "../assets/logo3.png";

function Contact() {

  // FORM DATA

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: "",
    });


  // POPUP

  const [showPopup, setShowPopup] =
    useState(false);


  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value,
    });
  };


  // HANDLE SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.post(
          "/contact/send",
          formData
        );

      console.log(response.data);

      // SHOW POPUP

      setShowPopup(true);

      setTimeout(() => {

        setShowPopup(false);

      }, 3000);


      // CLEAR FORM

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Send Message"
      );
    }
  };


  return (
    <>
      <Navbar />

      <div className="contactContainer">

        <div className="contactCard">

          {/* TITLE */}

          <h1>
            Contact Us
          </h1>

          <p className="contactText">

            Have questions about events,
            registrations or collaborations?
            We'd love to hear from you.

          </p>


          {/* FORM */}

          <form
            className="contactForm"
            onSubmit={handleSubmit}
          >

            <div className="inputGroup">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="inputGroup">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="inputGroup">

              <label>
                Message
              </label>

              <textarea
                name="message"
                placeholder="Write your message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

            </div>


            <button type="submit">

              Send Message

            </button>

          </form>

        </div>


        {/* SUCCESS POPUP */}

        {
          showPopup && (

            <div className="success-popup">

              Message Sent Successfully ✅

            </div>
          )
        }

      </div>
    </>
  );
}

export default Contact;