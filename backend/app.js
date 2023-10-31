const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

const eventRouter = require("./routes/event.route");
const volunteerRouter = require("./routes/volunteer.route");

app.get("/", (req, res) => {
  res.send("Event Management System");
});

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use("/api/v1", eventRouter);
app.use("/api/v1", volunteerRouter);

module.exports = app;
