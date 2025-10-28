import { createSlice } from '@reduxjs/toolkit';

export const wisSlice = createSlice({
  name: "workInstructions",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    publishWI: (state, action) => {
      const index = state.list.findIndex((wi) => wi.id === action.payload.id);

      if(index !== -1) {
        state.list[index] = {...action.payload, status: "Published"};
      } else {
        state.list.push({...action.payload, status: "Published"});
      }
    },
    saveWIDraft: (state, action) => {
      const index = state.list.findIndex((wi) => wi.id === action.payload.id);

      if(index !== -1) {
        state.list[index] = {...action.payload, status: "Draft"};
      } else {
        state.list.push({...action.payload, status: "Draft"});
      }
    },
    deleteWI: (state, action) => {
        state.list = state.list.filter((wi) => wi.id !== action.payload.id);
    }
  },
});

export const selectWorkInstructions = (state) => state.workInstructions;
export const selectPublishedWIs = (state) => state.workInstructions.list.filter((wi) => wi.status === "Published");
export const selectDraftWIs = (state) => state.workInstructions.list.filter((wi) => wi.status === "Draft");

export const { publishWI, saveWIDraft, deleteWI } = wisSlice.actions;
export default wisSlice.reducer;