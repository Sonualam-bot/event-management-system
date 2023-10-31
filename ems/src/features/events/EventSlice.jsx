import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://event-management-system-5ln9.onrender.com/api/v1";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  return response.data.events;
});

export const addEventAsync = createAsyncThunk(
  "events/addEventAsync",
  async (newEvent) => {
    const response = await axios.post(`${BASE_URL}/events`, newEvent);
    return response.data.event;
  }
);

export const updateEventAsync = createAsyncThunk(
  "events/updateEventAsync",
  async ({ id, updatedEvent }) => {
    console.log(id, updatedEvent);
    const response = await axios.post(`${BASE_URL}/events/${id}`, updatedEvent);
    console.log({ response });
    return response.data.event;
  }
);

export const deleteEventAsync = createAsyncThunk(
  "events/deleteEventAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/events/${id}`);
    return response.data.event;
  }
);

const initialState = {
  events: [],
  status: "idle",
  eventDetails: {
    name: "",
    date: "",
    location: "",
    description: "",
    requiredVolunteerRoles: "",
  },
  showEventForm: false,
};

const Eventslice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setShowEventForm: (state, action) => ({
      ...state,
      showEventForm: action.payload,
    }),
    setEventInput: (state, action) => ({
      ...state,
      eventDetails: action.payload,
    }),
    resetEventInput: (state) => ({
      ...state,
      eventDetails: initialState.eventDetails,
    }),
  },
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = action.payload;
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events.push(action.payload);
    },
    [addEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;
      const index = state.events.findIndex((s) => s._id === updatedEvent._id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    [updateEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        (event) => event._id !== action.payload._id
      );
    },
    [deleteEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setShowEventForm, setEventInput, resetEventInput } =
  Eventslice.actions;

export default Eventslice.reducer;
