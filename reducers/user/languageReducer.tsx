import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import en from "../../constants/en.json"
import {Language} from "../../constants/types";

const LanguageSlice = createSlice({
    name: 'language',
    initialState: en,
    reducers: {
        changeLanguage: (state, action: PayloadAction<Language>) => {
            return action.payload
        }
    },
})
export const { changeLanguage } = LanguageSlice.actions

export default LanguageSlice.reducer;
