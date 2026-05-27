// controllers/eventController.js

const Event = require(
  "../models/event.model.js"
);

const EventRegistration = require(
  "../models/EventRegistration.model.js"
);


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

    if (
      !name ||
      !email ||
      !branch ||
      !eventName
    ) {

      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const registration =
      await EventRegistration.create({
        name,
        email,
        branch,
        eventName,
      });

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
        message: "Event Not Found",
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