import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/mockApi';

// ---- ASYNC THUNKS ----
export const fetchWIs = createAsyncThunk(
  "wis/fetchWIs", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/wis");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const saveDraftAsync = createAsyncThunk(
  "wis/saveDraftAsync",
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("product", payload.product);
      formData.append("revision", payload.revision);
      formData.append("status", "Draft");

      if (payload.file) {
        formData.append("file", payload.file); // must be a File or Blob
      }

      const response = await api.post("/wis", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Saved WI response:", response.data);
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
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("product", payload.product);
      formData.append("revision", payload.revision);
      formData.append("status", "Published");

      if (payload.file) {
        formData.append("file", payload.file);
      }

      const response = await api.post("/wis", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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

// ---- SLICE ----
const wisSlice = createSlice({
  name: "workInstructions",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchWIs
      .addCase(fetchWIs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWIs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchWIs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // saveDraftAsync
      .addCase(saveDraftAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDraftAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(wi => wi.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(saveDraftAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // publishWIAsync
      .addCase(publishWIAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishWIAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(wi => wi.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(publishWIAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteWIAsync
      .addCase(deleteWIAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(wi => wi.id !== action.payload);
      });
  }
});

// ---- SELECTORS ----
export const selectWorkInstructions = (state) => state.workInstructions.list;
export const selectLoading = (state) => state.workInstructions.loading;
export const selectError = (state) => state.workInstructions.error;
export const selectPublishedWIs = (state) => state.workInstructions.list.filter(wi => wi.status === "Published");
export const selectDraftWIs = (state) => state.workInstructions.list.filter(wi => wi.status === "Draft");

export default wisSlice.reducer;
