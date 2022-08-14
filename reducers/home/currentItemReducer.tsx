import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Todo add item type
const CurrentItemSlice = createSlice({
    name: 'currentItem',
    initialState: {},
    reducers: {
        isCurrentItem: (state, action: PayloadAction<{}>) => {
            return action.payload
        }
    },
})
export const { isCurrentItem } = CurrentItemSlice.actions

export default CurrentItemSlice.reducer;
