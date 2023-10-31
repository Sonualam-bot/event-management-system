import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./features/events/EventSlice";

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;
