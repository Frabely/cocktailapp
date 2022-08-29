import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cocktail} from "../../constants/types";

const initialState: Cocktail[] = []

const DataSetSlice = createSlice({
    name: 'dataSet',
    initialState: initialState,
    reducers: {
        changeDataSet: (state, action: PayloadAction<Cocktail[]>) => {
            return action.payload
        }
    },
})
export const {changeDataSet} = DataSetSlice.actions

export default DataSetSlice.reducer;
