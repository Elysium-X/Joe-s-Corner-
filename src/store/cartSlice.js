import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        state.items[existingIndex].quantity += 1;
        return;
      }
      state.items.push({ ...product, quantity: 1 });
    },
    removeItem(state, action) {
      const productId = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === productId);
      if (existingIndex === -1) return;
      const existingItem = state.items[existingIndex];
      if (existingItem.quantity === 1) {
        state.items.splice(existingIndex, 1);
        return;
      }
      state.items[existingIndex].quantity -= 1;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
