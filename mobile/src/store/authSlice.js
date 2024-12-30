import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosConfig';

// Thunk pour l'inscription
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Tentative d\'inscription :', userData);
      const response = await axios.post('/auth/register', userData);
      console.log('Réponse inscription :', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur inscription :', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: 'Erreur d\'inscription' });
    }
  }
);

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('Tentative de connexion :', { email });
      const response = await axios.post('/auth/login', { email, password });
      console.log('Réponse connexion :', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur connexion :', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: 'Erreur de connexion' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    // Gestion de l'inscription
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    // Gestion de la connexion
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;