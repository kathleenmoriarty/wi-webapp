import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/mockApi';

export const fetchWIs = createAsyncThunk(
  "wis/fetchWIs", 
  async(_, {rejectWithValue}) => {
  try {
    const response = await api.get("/wis");
    return response.data;
  } catch(err) {
    return rejectWithValue(err.message);
  }
});

export const saveDraftAsync = createAsyncThunk(
  "wis/saveDraftAsync",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await api.post("/wis", {...payload, status: "Draft"});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const publishWIAsync = createAsyncThunk(
  "wis/publishWIAsync",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/wis", {...payload, status: "Published"});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteWIAsync = createAsyncThunk(
  "wis/deleteWIAsync",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/wis/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const wisSlice = createSlice({
  name: "workInstructions",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchWIs.pending]: (state) => {
      state.loading = true;
    },
    [fetchWIs.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [fetchWIs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [saveDraftAsync.pending]: (state) => {
      state.loading = true
      state.error = false
    },
    [saveDraftAsync.fulfilled]: (state, action) => {
      const index = state.list.findIndex((wi) => wi.id === action.payload.id);
      if(index !== -1) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
      state.loading = false
      state.error = false
    },
    [saveDraftAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [publishWIAsync.pending]: (state) => {
      state.loading = true
      state.error = false
    },
    [publishWIAsync.fulfilled]: (state, action) => {
      const index = state.list.findIndex((wi) => wi.id === action.payload.id);
      if(index !== -1) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
      state.loading = false
      state.error = false
    },
    [publishWIAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [deleteWIAsync.fulfilled]: (state, action) => {
      state.list = state.list.filter((wi) => wi.id !== action.payload);
    }
  }
});

export const selectWorkInstructions = (state) => state.workInstructions.list;
export const selectLoading = (state) => state.workInstructions.loading;
export const selectError = (state) => state.workInstructions.error;
export const selectPublishedWIs = (state) => state.workInstructions.list.filter((wi) => wi.status === "Published");
export const selectDraftWIs = (state) => state.workInstructions.list.filter((wi) => wi.status === "Draft");

export default wisSlice.reducer;