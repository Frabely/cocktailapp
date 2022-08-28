import {createSlice} from "@reduxjs/toolkit";

const isModalSlice = createSlice({
    name: 'isModal',
    initialState: false,
    reducers: {
        invertIsModalState: (state) => {
            return !state
        }
    },
})
export const { invertIsModalState } = isModalSlice.actions

export default isModalSlice.reducer;
