import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: string = '';

const currentAppScreenSlice = createSlice({
    name: 'currentAppScreen',
    initialState: initialState,
    reducers: {
        setHomeScreen: (state, action: PayloadAction<string>) => {
            return action.payload
        },
        setLoginScreen: (state, action: PayloadAction<string>) => {
            return action.payload
        },
        setProfileScreen: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    },
})
export const { setHomeScreen, setLoginScreen, setProfileScreen } = currentAppScreenSlice.actions

export default currentAppScreenSlice.reducer;
