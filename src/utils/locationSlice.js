import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locationSearchTerm: "",
    locationData: [],
    placeId:"",
    coordinates: []
  },
  reducers: {
    setLocationSearchTerm: (state, action) => {
      state.locationSearchTerm = action.payload;
    },
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    setPlaceId: (state, action) => {
      state.placeId = action.payload;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
});

export const { setLocationSearchTerm, setLocationData, setPlaceId, setCoordinates, } =
  locationSlice.actions;
export default locationSlice.reducer;
