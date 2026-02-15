import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import userProgressReducer from "./userProgressSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    userProgress: userProgressReducer,
  },
});

export default store;
