import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserCredential} from "firebase/auth";

const initialState: UserCredential | {} = {};

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        activeUser: (state, action: PayloadAction<UserCredential>) => {
            return action.payload
        }
    },
})
export const { activeUser } = UserSlice.actions
export type User = {
    name: string,
    email: string,
    password: string
}

export default UserSlice.reducer;
