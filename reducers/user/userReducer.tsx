import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EMPTY_USER} from "../../constants/const_vars";

const UserSlice = createSlice({
    name: 'user',
    initialState: EMPTY_USER,
    reducers: {
        activeUser: (state, action: PayloadAction<User>) => {
            return action.payload
        }
    },
})
export const { activeUser } = UserSlice.actions
export type User = {
    username: string | null,
    email: string | null,
    userID: string | null,
    // language_Setting: string | null
}

export default UserSlice.reducer;
