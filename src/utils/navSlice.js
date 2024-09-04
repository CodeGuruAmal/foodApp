import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "menu",
  initialState: {
    menuClick: false,
    locationClick: false,
    cartClick: false
  },
  reducers: {
    setMenuClick: (state, action) => {
      state.menuClick = action.payload;
    },

    setLocationClick: (state, action) => {
      state.locationClick = action.payload
    },

    setCartClick: (state, action) => {
      state.cartClick = action.payload;
    }
  },
});

export const { setMenuClick, setLocationClick, setCartClick } = navSlice.actions;
export default navSlice.reducer;
