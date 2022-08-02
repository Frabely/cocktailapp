import {ALL} from "../../constants/const_vars";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/configureStore";


const initialState: any[] = [ALL];

const glassTypeFilterSlice = createSlice({
    name: 'glassType',
    initialState: initialState,
    reducers: {
        changeGlassType: (state, action: PayloadAction<any[]>) => {
            return action.payload
        }
    },
})
export const { changeGlassType } = glassTypeFilterSlice.actions

export default glassTypeFilterSlice.reducer;
