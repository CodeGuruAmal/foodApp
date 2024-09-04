import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: JSON.parse(localStorage.getItem('cartData')) || [],
    addedItem: JSON.parse(localStorage.getItem('addedItem')) || [],
  },
  reducers: {
    setCartData: (state, action) => {
      state.cartData = [...state.cartData, action.payload];

      localStorage.setItem('cartData', JSON.stringify(state.cartData));
    },

    setAddedItem: (state, action) => {
      state.addedItem = [...state.addedItem, action.payload];
      
      localStorage.setItem('addedItem', JSON.stringify(state.addedItem));
    },

    clearCart: (state, action) => {
      state.cartData = [];
      state.addedItem = [];

      localStorage.removeItem('cartData');
      localStorage.removeItem('addedItem');

    },
    removeItem: (state, action) => {
      state.cartData = state.cartData.filter(item => item.id !== action.payload);
      state.addedItem = state.addedItem.filter(item => item !== action.payload);

      localStorage.setItem('cartData', JSON.stringify(state.cartData));
      localStorage.setItem('addedItem', JSON.stringify(state.addedItem));

    },
  },
});

export const { setCartData, setAddedItem, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
