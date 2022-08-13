import {createSlice} from "@reduxjs/toolkit";
import {HOME, LOGIN, PROFILE, USER_PROFILE_SETTINGS} from "../constants/const_vars";

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
        setUserProfileSettingsScreen: () => {
            return USER_PROFILE_SETTINGS
        },
    },
})
export const { setHomeScreen, setLoginScreen, setProfileScreen, setUserProfileSettingsScreen } = currentAppScreenSlice.actions

export default currentAppScreenSlice.reducer;
