import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ALL} from "../../constants/const_vars";

const initialState: any[] = [ALL];

const categoryFilterSlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<any[]>) => {
            return action.payload
        }
    },
})
export const { changeCategory } = categoryFilterSlice.actions

export default categoryFilterSlice.reducer;
