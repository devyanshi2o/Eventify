// controllers/eventController.js

const Event = require(
  "../models/event.model.js"
);

const EventRegistration = require(
  "../models/EventRegistration.model.js"
);

const nodemailer =
  require("nodemailer");


// EMAIL TRANSPORTER

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,

    },
});


// REGISTER EVENT

const registerEvent = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      branch,
      eventName,
    } = req.body;

    // VALIDATION

    if (
      !name ||
      !email ||
      !branch ||
      !eventName
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all fields",

      });
    }

    // SAVE REGISTRATION

    const registration =
      await EventRegistration.create({

        name,
        email,
        branch,
        eventName,

      });

    // SEND EMAIL

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Event Registration Successful",

      html: `

        <h2>
          Eventify
        </h2>

        <p>
          Hello ${name},
        </p>

        <p>

          You have successfully
          registered for:

          <b>${eventName}</b>

        </p>

        <p>
          Branch: ${branch}
        </p>

        <p>
          Thank you for using
          Eventify 🎉
        </p>

      `,
    });

    // RESPONSE

    res.status(201).json({

      success: true,

      message:
        "Event Registration Successful",

      data: registration,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });
  }
};


// CREATE EVENT

const createEvent = async (
  req,
  res
) => {

  try {

    const event =
      await Event.create(req.body);

    res.status(201).json({

      success: true,

      message:
        "Event Created Successfully",

      data: event,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });
  }
};


// GET ALL EVENTS

const getEvents = async (
  req,
  res
) => {

  try {

    const events =
      await Event.find().sort({

        createdAt: -1,

      });

    res.status(200).json(events);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });
  }
};


// GET SINGLE EVENT

const getSingleEvent = async (
  req,
  res
) => {

  try {

    const event =
      await Event.findById(
        req.params.id
      );

    if (!event) {

      return res.status(404).json({

        success: false,

        message:
          "Event Not Found",

      });
    }

    res.status(200).json(event);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });
  }
};


// UPDATE EVENT

const updateEvent = async (
  req,
  res
) => {

  try {

    const updatedEvent =
      await Event.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }
      );

    res.status(200).json({

      success: true,

      message:
        "Event Updated Successfully",

      data: updatedEvent,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });
  }
};


// DELETE EVENT

const deleteEvent = async (
  req,
  res
) => {

  try {

    await Event.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
        "Event Deleted Successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });
  }
};


// GET ALL REGISTRATIONS

const getRegistrations = async (
  req,
  res
) => {

  try {

    const registrations =
      await EventRegistration.find()
      .sort({

        createdAt: -1,

      });

    res.status(200).json({

      success: true,

      data: registrations,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });
  }
};


module.exports = {

  registerEvent,

  getRegistrations,

  createEvent,

  getEvents,

  getSingleEvent,

  updateEvent,

  deleteEvent,
};