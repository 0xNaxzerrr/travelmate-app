import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async () => {
    const response = await api.getTrips();
    return response.data;
  }
);

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default tripSlice.reducer;