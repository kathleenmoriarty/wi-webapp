import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const saveDraftAsync = createAsyncThunk(
  "workInstructions/saveDraftAsync",
  async (payload, {rejectWithValue}) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {...payload, status: "Draft"};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const publishWIAsync = createAsyncThunk(
  "workInstructions/publishWIAsync",
  async (payload, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {...payload, status: "Published"};
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
  reducers: {
    deleteWI: (state, action) => {
        state.list = state.list.filter((wi) => wi.id !== action.payload.id);
    }
  },
  extraReducers: {
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
    }
  }
});

export const selectWorkInstructions = (state) => state.workInstructions;
export const selectLoading = (state) => state.workInstructions.loading;
export const selectError = (state) => state.workInstructions.error;
export const selectPublishedWIs = (state) => state.workInstructions.list.filter((wi) => wi.status === "Published");
export const selectDraftWIs = (state) => state.workInstructions.list.filter((wi) => wi.status === "Draft");

export const { deleteWI } = wisSlice.actions;
export default wisSlice.reducer;