import {ALL} from "../../constants/const_vars";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/configureStore";


const initialState: any[] = [ALL];

const categoryFilterSlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<any[]>) => {
            return action.payload
        }
    },
})
export const { changeCategory } = categoryFilterSlice.actions

export default categoryFilterSlice.reducer;
