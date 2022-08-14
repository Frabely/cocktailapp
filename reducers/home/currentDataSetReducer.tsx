import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: any[] = []

const CurrentDataSetSlice = createSlice({
    name: 'currentDataSet',
    initialState: initialState,
    reducers: {
        changeCurrentDataSet: (state, action: PayloadAction<any[]>) => {
            return action.payload
        }
    },
})
export const { changeCurrentDataSet } = CurrentDataSetSlice.actions

export default CurrentDataSetSlice.reducer;
