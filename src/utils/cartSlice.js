import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
    addedItem: [],
  },
  reducers: {
    setCartData: (state, action) => {
      state.cartData = [...state.cartData, action.payload];
    },

    setAddedItem: (state, action) => {
      state.addedItem = [...state.addedItem, action.payload];
    },

    clearCart: (state, action) => {
      state.cartData = [];
      state.addedItem = [];

    },
    removeItem: (state, action) => {
      state.cartData = state.cartData.filter(item => item.id !== action.payload);
      state.addedItem = state.addedItem.filter(item => item.id !== action.payload);
    },
  },
});

export const { setCartData, setAddedItem, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
