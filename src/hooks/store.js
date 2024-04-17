import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({ 
  reducer: {
    currentUser:  userReducer,
  },
});

export default store;