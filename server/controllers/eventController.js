// controllers/eventController.js

const EventRegistration = require(
  "../models/EventRegistration.model.js"
);


// REGISTER EVENT
const registerEvent = async (req, res) => {

  try {

    const {
      name,
      email,
      branch,
      eventName,
    } = req.body;

    // Validation
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

    // Save Registration
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

module.exports = {
  registerEvent,
};