import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EMPTY_ITEM} from "../../constants/const_vars";
import {Cocktail} from "../../constants/dummyData3";

// Todo add item type
const CurrentItemSlice = createSlice({
    name: 'currentItem',
    initialState: EMPTY_ITEM,
    reducers: {
        changeCurrentItem: (state, action: PayloadAction<Cocktail>) => {
            return action.payload
        }
    },
})
export const { changeCurrentItem } = CurrentItemSlice.actions

export default CurrentItemSlice.reducer;
