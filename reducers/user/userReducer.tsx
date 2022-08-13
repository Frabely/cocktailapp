import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: User = {username: null, email: null};

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
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
}

export default UserSlice.reducer;
