import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: string[] = ['AlphabeticalAZ'];

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
