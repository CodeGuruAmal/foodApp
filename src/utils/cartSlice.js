import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    resInfo : JSON.parse(localStorage.getItem('resInfo')) || [],
    cartData: JSON.parse(localStorage.getItem('cartData')) || [],
    addedItem: JSON.parse(localStorage.getItem('addedItem')) || [],
    isDiffResMessage: false,
  },


  reducers: {

    setResInfo: (state, action) => {
      state.resInfo = action.payload;
      localStorage.setItem('resInfo', JSON.stringify(action.payload));

    },

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
      state.resInfo = []

      localStorage.removeItem('cartData');
      localStorage.removeItem('addedItem');
      localStorage.removeItem('resInfo');

    },
    removeItem: (state, action) => {
      state.cartData = state.cartData.filter(item => item.id !== action.payload);
      state.addedItem = state.addedItem.filter(item => item !== action.payload);
      if(state.cartData.length === 0 || state.addedItem.length === 0) {
        state.resInfo = []
        localStorage.removeItem('resInfo');
      }

      // console.log(JSON.stringify(state.resInfo));
      localStorage.setItem('cartData', JSON.stringify(state.cartData));
      localStorage.setItem('addedItem', JSON.stringify(state.addedItem));

    },

    setIsDiffResMessage: (state, action) => {
      state.isDiffResMessage = action.payload
    }
  },
});

export const { setCartData, setAddedItem, clearCart, removeItem, setResInfo, setIsDiffResMessage } = cartSlice.actions;
export default cartSlice.reducer;
