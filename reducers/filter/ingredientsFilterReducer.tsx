import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: string[] = [];

const ingredientsFilterSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        changeIngredients: (state, action: PayloadAction<string[]>) => {
            if (state === [])
                return []
            return action.payload
        }
    },
})
export const { changeIngredients } = ingredientsFilterSlice.actions

export default ingredientsFilterSlice.reducer;
