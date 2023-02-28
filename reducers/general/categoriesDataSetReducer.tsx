import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: string[] = []

const CategoriesDataSetSlice = createSlice({
    name: 'categoryDataSet',
    initialState: initialState,
    reducers: {
        changeCategoryDataSet: (state, action: PayloadAction<string[]>) => {
            return action.payload
        }
    },
})
export const {changeCategoryDataSet} = CategoriesDataSetSlice.actions

export default CategoriesDataSetSlice.reducer;
