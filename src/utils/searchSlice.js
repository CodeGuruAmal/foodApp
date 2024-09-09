import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
       searchData : [],
       metaData: {}
    },
    reducers: {
setSearchData: (state, action) => {
    state.searchData = action.payload;
},
setMetaData: (state, action) => {
    state.metaData = action.payload;
},

    }
})

export const {setSearchData, setMetaData} = searchSlice.actions;
export default searchSlice.reducer;