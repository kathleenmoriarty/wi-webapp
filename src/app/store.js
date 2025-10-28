import { configureStore } from '@reduxjs/toolkit';

import workInstructionsReducer from "../features/wis/wisSlice"
import usersReducer from "../features/users/usersSlice"
import authReducer from '../features/auth/authSlice'
import searchReducer from '../features/search/searchSlice'

const store = configureStore({
  reducer: 
  {
    workInstructions: workInstructionsReducer,
    users: usersReducer,
    auth: authReducer,
    search: searchReducer
  }
});

export default store;