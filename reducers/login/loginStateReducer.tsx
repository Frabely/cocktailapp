import {createSlice} from "@reduxjs/toolkit";
import {CREATE_ACCOUNT_LABEL, FORGOT_PASSWORD_LABEL, LOGIN_LABEL} from "../../constants/const_vars";

const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: LOGIN_LABEL,
    reducers: {
        login: () => {
            return LOGIN_LABEL
        },
        createAccount: () => {
            return CREATE_ACCOUNT_LABEL
        },
        forgotPassword: () => {
            return FORGOT_PASSWORD_LABEL
        }
    },
})
export const { login, createAccount, forgotPassword } = loginStateSlice.actions

export default loginStateSlice.reducer;
