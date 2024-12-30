import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  currentTrip: null,
  isLoading: false,
  error: null
};

export const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
    },
    addTrip: (state, action) => {
      state.trips.push(action.payload);
    },
    setCurrentTrip: (state, action) => {
      state.currentTrip = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setTrips, addTrip, setCurrentTrip, setLoading, setError } = tripSlice.actions;

export default tripSlice.reducer;