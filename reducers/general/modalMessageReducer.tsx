import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const modalMessageSlice = createSlice({
    name: 'modalMessage',
    initialState: '',
    reducers: {
        changeModalMessage: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    },
})
export const { changeModalMessage } = modalMessageSlice.actions

export default modalMessageSlice.reducer;
