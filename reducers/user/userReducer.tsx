import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserCredential} from "firebase/auth";

const initialState: User | null = null;

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        activeUser: (state, action: PayloadAction<any>) => {
            return action.payload
        }
    },
})
export const { activeUser } = UserSlice.actions
export type User = {
    name: string | null,
    email: string | null,
}

export default UserSlice.reducer;
