import {createSlice} from "@reduxjs/toolkit";


const initialState: boolean = false;

const applyFilterSlice = createSlice({
    name: 'applyFilters',
    initialState: initialState,
    reducers: {
        invertApplyFiltersState: (state) => {
            return !state
        }
    },
})
export const { invertApplyFiltersState } = applyFilterSlice.actions

export default applyFilterSlice.reducer;
