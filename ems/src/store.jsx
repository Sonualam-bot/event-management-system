import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./features/events/EventSlice";
import volunteerReducer from "./features/volunteer/VolunteerSlice";

const store = configureStore({
  reducer: {
    events: eventReducer,
    volunteers: volunteerReducer,
  },
});

export default store;
