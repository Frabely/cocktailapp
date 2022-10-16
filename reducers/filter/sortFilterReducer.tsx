import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DEFAULT_SORT} from "../../constants/const_vars";

const initialState: string[] = [DEFAULT_SORT];

const sortSlice = createSlice({
    name: 'sort',
    initialState: initialState,
    reducers: {
        changeSort: (state, action: PayloadAction<string[]>) => {
            return action.payload
        }
    },
})
export const { changeSort } = sortSlice.actions

export default sortSlice.reducer;
