import {createSlice} from "@reduxjs/toolkit";
import {HOME, LOGIN, PROFILE, PROFILE_DETAILS} from "../constants/const_vars";

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
        },
        setProfileDetailsScreen: () => {
            return PROFILE_DETAILS
        },
    },
})
export const { setHomeScreen, setLoginScreen, setProfileScreen, setProfileDetailsScreen } = currentAppScreenSlice.actions

export default currentAppScreenSlice.reducer;
