import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Ingredient} from "../../constants/types";

const initialState: Ingredient[] = []

const IngredientsDataSetSlice = createSlice({
    name: 'ingredientDataSet',
    initialState: initialState,
    reducers: {
        changeIngredientsDataSet: (state, action: PayloadAction<Ingredient[]>) => {
            return action.payload
        }
    },
})
export const {changeIngredientsDataSet} = IngredientsDataSetSlice.actions

export default IngredientsDataSetSlice.reducer;
