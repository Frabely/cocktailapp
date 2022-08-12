import {createSlice} from "@reduxjs/toolkit";
import {HOME, LOGIN, PROFILE} from "../constants/const_vars";

const currentAppScreenSlice = createSlice({
    name: 'currentAppScreen',
    initialState: LOGIN,
    reducers: {
        setHomeScreen: () => {
            return HOME
        },
        setLoginScreen: () => {
            return LOGIN
        },
        setProfileScreen: () => {
            return PROFILE
        }
    },
})
export const { setHomeScreen, setLoginScreen, setProfileScreen } = currentAppScreenSlice.actions

export default currentAppScreenSlice.reducer;
