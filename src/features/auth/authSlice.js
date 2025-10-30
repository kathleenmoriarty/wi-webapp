import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/mockApi';

// ---- ASYNC THUNKS ----
export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ---- SLICE ----
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ---- EXPORTS ----
export const { logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;

