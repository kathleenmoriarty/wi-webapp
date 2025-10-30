// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/mockApi';

// ---- ASYNC THUNKS ----
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/users');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addUserAsync = createAsyncThunk(
  'users/addUserAsync',
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.post('/users', user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeUserAsync = createAsyncThunk(
  'users/removeUserAsync',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ---- SLICE ----
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addUserAsync
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // removeUserAsync
      .addCase(removeUserAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(user => user.id !== action.payload);
      });
  },
});

// ---- SELECTORS ----
export const selectUsers = (state) => state.users.list;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

export default usersSlice.reducer;

