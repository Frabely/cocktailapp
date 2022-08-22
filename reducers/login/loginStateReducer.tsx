import {createSlice} from "@reduxjs/toolkit";
import {CREATE_ACCOUNT, FORGOT_PASSWORD, LOGIN} from "../../constants/const_vars";

const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: LOGIN,
    reducers: {
        login: () => {
            return LOGIN
        },
        createAccount: () => {
            return CREATE_ACCOUNT
        },
        forgotPassword: () => {
            return FORGOT_PASSWORD
        }
    },
})
export const { login, createAccount, forgotPassword } = loginStateSlice.actions

export default loginStateSlice.reducer;
