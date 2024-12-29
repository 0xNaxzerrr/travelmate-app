import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './slices/tripSlice';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    trips: tripReducer,
    auth: authReducer
  }
});