// controllers/contactController.js

const Contact = require(
  "../models/Contact.model.js"
);


// SEND MESSAGE
const sendMessage = async (req, res) => {

  try {

    const {
      name,
      email,
      message,
    } = req.body;

    // Validation
    if (!name || !email || !message) {

      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Save Message
    const newMessage =
      await Contact.create({
        name,
        email,
        message,
      });

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      data: newMessage,
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
  sendMessage,
};