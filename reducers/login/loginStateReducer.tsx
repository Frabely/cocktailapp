import {createSlice} from "@reduxjs/toolkit";
import {CREATE_ACCOUNT_LABEL, FORGOT_PASSWORD_LABEL, LOGIN_LABEL} from "../../constants/labels";

const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: LOGIN_LABEL.ENG,
    reducers: {
        login: () => {
            return LOGIN_LABEL.ENG
        },
        createAccount: () => {
            return CREATE_ACCOUNT_LABEL.ENG
        },
        forgotPassword: () => {
            return FORGOT_PASSWORD_LABEL.ENG
        }
    },
})
export const { login, createAccount, forgotPassword } = loginStateSlice.actions

export default loginStateSlice.reducer;
