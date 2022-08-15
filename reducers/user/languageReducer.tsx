import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ENGLISH} from "../../constants/const_vars";

const LanguageSlice = createSlice({
    name: 'user',
    initialState: ENGLISH,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    },
})
export const { changeLanguage } = LanguageSlice.actions

export default LanguageSlice.reducer;
