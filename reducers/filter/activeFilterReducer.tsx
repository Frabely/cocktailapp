import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: string = '';

const activeFilterSlice = createSlice({
    name: 'activeFilter',
    initialState: initialState,
    reducers: {
        setActiveFilter: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    },
})
export const { setActiveFilter } = activeFilterSlice.actions

export default activeFilterSlice.reducer;
