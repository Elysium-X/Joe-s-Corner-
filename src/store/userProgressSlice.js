import { createSlice } from "@reduxjs/toolkit";

const userProgressSlice = createSlice({
  name: "userProgress",
  initialState: {
    progress: "",
  },
  reducers: {
    showCart(state) {
      state.progress = "cart";
    },
    hideCart(state) {
      state.progress = "";
    },
    showCheckout(state) {
      state.progress = "checkout";
    },
    hideCheckout(state) {
      state.progress = "";
    },
  },
});

export const { showCart, hideCart, showCheckout, hideCheckout } = userProgressSlice.actions;
export default userProgressSlice.reducer;
