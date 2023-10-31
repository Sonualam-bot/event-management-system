const Event = require("../models/event.model");

const getAllEvents = async () => {
  try {
    const allEvents = await Event.find({});
    console.log("All events:", allEvents);
    return allEvents;
  } catch (error) {
    console.log("Error fetching all events:", error);
  }
};

const addEvent = async (event) => {
  try {
    const newEvent = new Event(event);
    const savedEvent = await newEvent.save();
    if (savedEvent) {
      console.log("Added new event:", savedEvent);
      return savedEvent;
    } else {
      console.log("Unable to add event");
    }
  } catch (error) {
    console.log("Error adding event:", error);
  }
};

const editEvent = async (eventId, editedEvent) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      { _id: eventId },
      editedEvent,
      {
        new: true,
      }
    );
    if (updatedEvent) {
      return updatedEvent;
    } else {
      console.log("Unable to update event");
    }
  } catch (error) {
    console.log("Error updating event:", error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete({ _id: eventId });
    if (deletedEvent) {
      console.log("Event deleted successfully:", deletedEvent);
      return deletedEvent;
    } else {
      console.log("Unable to delete event");
    }
  } catch (error) {
    console.log("Error deleting event:", error);
  }
};

const getEvent = async (eventName) => {
  try {
    const selectedEvent = await Event.findOne({ name: eventName });
    if (selectedEvent) {
      console.log("Event fetched successfully:", selectedEvent);
      return selectedEvent;
    } else {
      console.log("Unable to fetch event");
    }
  } catch (error) {
    console.log("Error fetching event:", error);
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  editEvent,
  deleteEvent,
  getEvent,
};
