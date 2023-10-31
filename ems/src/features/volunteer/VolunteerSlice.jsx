import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = "https://event-management-system-5ln9.onrender.com/api/v1";

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    const response = await axios.get(`${BASE_URL}/volunteer`);
    console.log(response);
    return response.data.volunteers;
  }
);

export const addVolunteerAsync = createAsyncThunk(
  "volunteers/addVolunteerAsync",
  async (newVolunteer) => {
    const response = await axios.post(`${BASE_URL}/volunteer`, newVolunteer);
    return response.data.volunteer;
  }
);

export const updatedVolunteerAsync = createAsyncThunk(
  "volunteers/updatedVolunteerAsync",
  async ({ id, updatedVolunteer }) => {
    console.log(id, updatedVolunteer);
    const response = await axios.post(
      `${BASE_URL}/volunteer/${id}`,
      updatedVolunteer
    );
    return response.data.volunteer;
  }
);

export const deleteVolunteerAsync = createAsyncThunk(
  "volunteers/deleteVolunteerAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/volunteer/${id}`);
    return response.data.volunteer;
  }
);

const initialState = {
  volunteers: [],
  status: "idle",
  volunteerDetails: {
    name: "",
    contact: "",
    skills: "",
    availability: "",
    areasOfInterest: "",
    events: "",
  },
  showEventForm: false,
};

const VolunteerSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {
    setShowVolunteerForm: (state, action) => ({
      ...state,
      showVolunteerForm: action.payload,
    }),
    setVolunteerInput: (state, action) => ({
      ...state,
      volunteerDetails: action.payload,
    }),
    resetVolunteerInput: (state) => ({
      ...state,
      volunteerDetails: initialState.volunteerDetails,
    }),
  },
  extraReducers: {
    [fetchVolunteers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = action.payload;
    },
    [fetchVolunteers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers.push(action.payload);
    },
    [addVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatedVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updatedVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload;
      const index = state.volunteers.findIndex(
        (s) => s._id === updatedVolunteer._id
      );
      if (index !== -1) {
        state.volunteers[index] = updatedVolunteer;
      }
    },
    [updatedVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = state.volunteers.filter(
        (volunteer) => volunteer._id !== action.payload._id
      );
    },
    [deleteVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setShowVolunteerForm, setVolunteerInput, resetVolunteerInput } =
  VolunteerSlice.actions;

export default VolunteerSlice.reducer;
