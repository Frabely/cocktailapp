import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cocktail} from "../../constants/types";

const initialState: Cocktail[] = []

const CurrentDataSetSlice = createSlice({
    name: 'currentDataSet',
    initialState: initialState,
    reducers: {
        changeCurrentDataSet: (state, action: PayloadAction<Cocktail[]>) => {
            return action.payload
        }
    },
})
export const { changeCurrentDataSet } = CurrentDataSetSlice.actions

export default CurrentDataSetSlice.reducer;
