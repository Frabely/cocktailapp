import {createSlice} from "@reduxjs/toolkit";
import {CREATE_ACCOUNT_LABEL, FORGOT_PASSWORD_LABEL, LOGIN_LABEL} from "../../constants/labels";

const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: LOGIN_LABEL.en,
    reducers: {
        login: () => {
            return LOGIN_LABEL.en
        },
        createAccount: () => {
            return CREATE_ACCOUNT_LABEL.en
        },
        forgotPassword: () => {
            return FORGOT_PASSWORD_LABEL.en
        }
    },
})
export const { login, createAccount, forgotPassword } = loginStateSlice.actions

export default loginStateSlice.reducer;
