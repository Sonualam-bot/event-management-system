const Volunteer = require("../models/volunteer.model");

const getAllVolunteers = async () => {
  try {
    const allVolunteers = await Volunteer.find({}).populate({
      path: "events",
      select: "name location",
    });
    return allVolunteers;
  } catch (error) {
    console.log("Error fetching all volunteers");
  }
};

const addVolunteer = async (volunteer) => {
  try {
    const newVolunteer = new Volunteer(volunteer);
    const populatedVolunteer = await newVolunteer.populate({
      path: "events",
      select: "name location",
    });
    const savedVolunteer = await populatedVolunteer.save();
    if (savedVolunteer) {
      console.log("Added new volunteer:", savedVolunteer);
      return savedVolunteer;
    } else {
      console.log("Unable to add volunteer");
    }
  } catch (error) {
    console.log("Error adding volunteer:", error);
  }
};

const editVolunteer = async (volunteerId, editedVolunteer) => {
  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      { _id: volunteerId },
      editedVolunteer,
      {
        new: true,
      }
    ).populate({
      path: "events",
      select: "name location",
    });
    if (updatedVolunteer) {
      return updatedVolunteer;
    } else {
      console.log("Unable to update volunteer");
    }
  } catch (error) {
    console.log("Error editing volunteer:", error);
  }
};

const deleteVolunteer = async (volunteerId) => {
  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId);
    if (deletedVolunteer) {
      console.log("Deleted volunteer:", deletedVolunteer);
      return deletedVolunteer;
    } else {
      console.log("Unable to delete volunteer");
    }
  } catch (error) {
    console.log("Error deleting volunteer:", error);
  }
};

const getVolunteer = async (volunteerName) => {
  try {
    const selectedVolunteer = await Volunteer.findOne({
      name: volunteerName,
    }).populate({
      path: "events",
      select: "name location",
    });
    if (selectedVolunteer) {
      console.log("Volunteer fetched successfully:", selectedVolunteer);
      return selectedVolunteer;
    } else {
      console.log("Unable to fetch volunteer");
    }
  } catch (error) {
    console.log("Error fetching volunteer:", error);
  }
};

module.exports = {
  getAllVolunteers,
  addVolunteer,
  editVolunteer,
  deleteVolunteer,
  getVolunteer,
};
