import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'currentUser',
  initialState: {
    currentUser: '',
    role: '',
  },
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addRole: (state, action) => {
      state.role = action.payload;
    },
    resetUser: (state) => {
      state.currentUser = '';
      state.role = '';
    },
  }
});

export const { addUser, addRole, resetUser } = userSlice.actions;

export default userSlice.reducer;