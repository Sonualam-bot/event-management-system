const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredVolunteerRoles: {
      type: String,
      enum: [
        "Stage Crew",
        "Security Team",
        "Exhibit Guide",
        "Information Desk",
        "Activity Supervisor",
        "Ticketing",
        "Usher",
        "Public Relations",
        "Campaign Promoter",
        "Health Advisor",
        "Assistant Instructor",
        "Choreographer",
        "Technical Support",
        "Event Management",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
