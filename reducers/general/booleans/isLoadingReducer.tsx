import {createSlice} from "@reduxjs/toolkit";


const initialState: boolean = false

const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: initialState,
    reducers: {
        invertIsLoading: (state) => {
            return !state
        },
        setIsLoadingTrue: () => {
            return true
        },
        setIsLoadingFalse: () => {
            return false
        }
    },
})
export const {invertIsLoading, setIsLoadingTrue, setIsLoadingFalse} = isLoadingSlice.actions

export default isLoadingSlice.reducer;
