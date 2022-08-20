import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ALL} from "../../constants/const_vars";

const initialState: string[] = [ALL];

const glassTypeFilterSlice = createSlice({
    name: 'glassType',
    initialState: initialState,
    reducers: {
        changeGlassType: (state, action: PayloadAction<string[]>) => {
            return action.payload
        }
    },
})
export const { changeGlassType } = glassTypeFilterSlice.actions

export default glassTypeFilterSlice.reducer;
