import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';

export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/api/trips`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    loading: false,
    error: null,
    currentTrip: null
  },
  reducers: {
    setCurrentTrip: (state, action) => {
      state.currentTrip = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
        state.error = null;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentTrip } = tripSlice.actions;
export default tripSlice.reducer;