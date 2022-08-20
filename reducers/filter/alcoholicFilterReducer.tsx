import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ALL} from "../../constants/const_vars";

const initialState: string[] = [ALL];

const alcoholicSlice = createSlice({
    name: 'alcoholic',
    initialState: initialState,
    reducers: {
        changeAlcoholic: (state, action: PayloadAction<string[]>) => {
            return action.payload
        }
    },
})
export const { changeAlcoholic } = alcoholicSlice.actions

export default alcoholicSlice.reducer;
