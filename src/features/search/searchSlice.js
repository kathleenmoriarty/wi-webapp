import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    searchType: "wis"
  },
  reducers: {
    setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
    },
    setSearchType: (state, action) => {
        state.searchType = action.payload;
    }
  }
});

export const selectSearchTerm= (state) => state.search.searchTerm;
export const selectSearchType = (state) => state.search.searchType;

export const { setSearchTerm, setSearchType } = searchSlice.actions;
export default searchSlice.reducer;