import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock login API call
export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API delay

      // Mock authentication logic
      if (email === 'admin@example.com' && password === 'Password123*') {
        return { id: 1, name: 'Admin User', email };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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
  extraReducers: {
    [loginAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [loginAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
