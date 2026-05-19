// models/EventRegistration.model.js

const mongoose = require("mongoose");

const eventRegistrationSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

  }, {
    timestamps: true,
  });

module.exports = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);