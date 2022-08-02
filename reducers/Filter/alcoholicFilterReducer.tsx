import {ALL} from "../../constants/const_vars";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/configureStore";


const initialState: any[] = [ALL];

const alcoholicSlice = createSlice({
    name: 'alcoholic',
    initialState: initialState,
    reducers: {
        changeAlcoholic: (state, action: PayloadAction<any[]>) => {
            return action.payload
        }
    },
})
export const { changeAlcoholic } = alcoholicSlice.actions

export default alcoholicSlice.reducer;
