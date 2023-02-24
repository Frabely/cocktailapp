import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import en from "../../constants/en.json"

const LanguageSlice = createSlice({
    name: 'language',
    initialState: en,
    reducers: {
        //TODO add type for json
        changeLanguage: (state, action: PayloadAction<any>) => {
            return action.payload
        }
    },
})
export const { changeLanguage } = LanguageSlice.actions

export default LanguageSlice.reducer;
