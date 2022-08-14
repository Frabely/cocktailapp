import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: string = ''

const CurrentSearchFieldInputSlice = createSlice({
    name: 'currentSearchFieldInput',
    initialState: initialState,
    reducers: {
        changeCurrentSearchFieldInput: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    },
})
export const { changeCurrentSearchFieldInput } = CurrentSearchFieldInputSlice.actions

export default CurrentSearchFieldInputSlice.reducer;
