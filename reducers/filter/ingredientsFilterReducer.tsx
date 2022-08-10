import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: any[] = [];

const ingredientsFilterSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        changeIngredients: (state, action: PayloadAction<any[]>) => {
            if (state === [])
                return []
            return action.payload
        }
    },
})
export const { changeIngredients } = ingredientsFilterSlice.actions

export default ingredientsFilterSlice.reducer;
