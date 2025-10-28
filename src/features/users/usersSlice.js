import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    removeUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const selectUsers = (state) => state.users.list;

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;