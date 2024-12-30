import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../config';

// Thunks
export const planTrip = createAsyncThunk(
  'trips/planTrip',
  async ({ country, duration }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/trips/plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country, duration })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserTrips = createAsyncThunk(
  'trips/fetchUserTrips',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/trips`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTripPhoto = createAsyncThunk(
  'trips/addPhoto',
  async ({ tripId, photoData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/trips/${tripId}/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photoData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return { tripId, photo: data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const shareTrip = createAsyncThunk(
  'trips/shareTrip',
  async (tripId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/trips/${tripId}/share`, {
        method: 'POST'
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return { tripId, shareableLink: data.shareableLink };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    currentTrip: null,
    loading: false,
    error: null
  },
  reducers: {
    setCurrentTrip: (state, action) => {
      state.currentTrip = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Plan Trip
      .addCase(planTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(planTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips.push(action.payload);
        state.currentTrip = action.payload;
      })
      .addCase(planTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Trips
      .addCase(fetchUserTrips.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchUserTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Photo
      .addCase(addTripPhoto.fulfilled, (state, action) => {
        const trip = state.trips.find(t => t._id === action.payload.tripId);
        if (trip) {
          trip.photos.push(action.payload.photo);
        }
        if (state.currentTrip?._id === action.payload.tripId) {
          state.currentTrip.photos.push(action.payload.photo);
        }
      })

      // Share Trip
      .addCase(shareTrip.fulfilled, (state, action) => {
        const trip = state.trips.find(t => t._id === action.payload.tripId);
        if (trip) {
          trip.shareableLink = action.payload.shareableLink;
        }
        if (state.currentTrip?._id === action.payload.tripId) {
          state.currentTrip.shareableLink = action.payload.shareableLink;
        }
      });
  }
});

export const { setCurrentTrip, clearError } = tripSlice.actions;

export default tripSlice.reducer;