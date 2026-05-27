const express = require("express");

const router = express.Router();

const {

  registerEvent,

  getRegistrations,

  createEvent,

  getEvents,

  getSingleEvent,

  updateEvent,

  deleteEvent,

} = require(
  "../controllers/eventController"
);

// REGISTER EVENT
router.post(
  "/register-event",
  registerEvent
);

// CREATE EVENT
router.post(
  "/",
  createEvent
);

// GET ALL EVENTS
router.get(
  "/",
  getEvents
);

// GET ALL REGISTRATIONS
router.get(
  "/registrations",
  getRegistrations
);

// GET SINGLE EVENT
router.get(
  "/:id",
  getSingleEvent
);

// UPDATE EVENT
router.put(
  "/:id",
  updateEvent
);

// DELETE EVENT
router.delete(
  "/:id",
  deleteEvent
);

module.exports = router;