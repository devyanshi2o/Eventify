// About.jsx

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import aboutImage from "../assets/heroimage.png";

import {
  FaUsers,
  FaCalendarCheck,
  FaRocket,
  FaLightbulb
} from "react-icons/fa";

function About() {

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}

      <section
        className="aboutHero"
        style={{
          backgroundImage:
            `linear-gradient(
              rgba(0,0,0,0.72),
              rgba(0,0,0,0.72)
            ),
            url(${aboutImage})`
        }}
      >

        <div className="aboutOverlay">

          <div className="aboutContent">

            <p className="aboutSmallText">
              About Eventify
            </p>

            <h1>
              Bringing Campus <br />
              Events Together
            </h1>

            <p className="aboutDescription">

              Eventify is a smart campus event platform created
              for students to discover workshops, hackathons,
              cultural festivals, technical events, sports
              competitions and club activities happening inside
              their college campus.

            </p>

          </div>

        </div>

      </section>


      {/* ABOUT SECTION */}

      <section className="aboutSection">

        <div className="aboutLeft">

          <h2>
            Our Mission
          </h2>

          <p>

            Our mission is to help students stay connected
            with everything happening around campus through
            one modern and easy-to-use platform.

          </p>

          <p>

            From technical hackathons and coding contests
            to cultural fests and sports tournaments,
            Eventify helps students explore opportunities,
            participate in events and grow together.

          </p>

        </div>


        {/* FEATURES */}

        <div className="aboutRight">

          <div className="featureCard">

            <FaUsers className="featureIcon" />

            <h3>
              Student Community
            </h3>

            <p>
              Connecting students through engaging campus activities.
            </p>

          </div>


          <div className="featureCard">

            <FaCalendarCheck className="featureIcon" />

            <h3>
              Campus Events
            </h3>

            <p>
              Discover hackathons, workshops, seminars and festivals.
            </p>

          </div>


          <div className="featureCard">

            <FaRocket className="featureIcon" />

            <h3>
              Easy Registration
            </h3>

            <p>
              Quick and simple event registration for students.
            </p>

          </div>


          <div className="featureCard">

            <FaLightbulb className="featureIcon" />

            <h3>
              Skill Development
            </h3>

            <p>
              Encouraging learning, networking and innovation.
            </p>

          </div>

        </div>

      </section>


      {/* STATS SECTION */}

      <section className="aboutStats">

        <div className="statBox">

          <h2>
            250+
          </h2>

          <p>
            Campus Events
          </p>

        </div>


        <div className="statBox">

          <h2>
            3K+
          </h2>

          <p>
            Students Connected
          </p>

        </div>


        <div className="statBox">

          <h2>
            40+
          </h2>

          <p>
            College Clubs
          </p>

        </div>


        <div className="statBox">

          <h2>
            24/7
          </h2>

          <p>
            Event Access
          </p>

        </div>

      </section>

      {/* <Footer /> */}
    </>
  );
}

export default About;