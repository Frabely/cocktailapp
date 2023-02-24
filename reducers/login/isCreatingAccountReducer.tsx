import {createSlice} from "@reduxjs/toolkit";
import {CREATE_ACCOUNT_LABEL} from "../../constants/const_vars";

const initialState: string[] = ['']

const isCreatingAccountSlice = createSlice({
    name: 'isCreatingAccount',
    initialState: initialState,
    reducers: {
        invertIsCreatingAccount: (state) => {
            if (state.includes(CREATE_ACCOUNT_LABEL))
                return ['']
            return [CREATE_ACCOUNT_LABEL]
        }
    },
})
export const { invertIsCreatingAccount } = isCreatingAccountSlice.actions

export default isCreatingAccountSlice.reducer;
