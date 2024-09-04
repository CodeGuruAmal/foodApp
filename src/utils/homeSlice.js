import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        homeData: []
    },
    reducers: {
        setHomeData: (state, action) => {
            state.homeData = action.payload;
        }
    }
})

export const {setHomeData} = homeSlice.actions
export default homeSlice.reducer;