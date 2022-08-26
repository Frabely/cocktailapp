import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EMPTY_USER} from "../../constants/const_vars";
import {Cocktail} from "../../constants/types";

const UserSlice = createSlice({
    name: 'user',
    initialState: EMPTY_USER,
    reducers: {
        activeUser: (state, action: PayloadAction<User>) => {
            return action.payload
        },
        changeFavorites: (state, action: PayloadAction<Cocktail[]>) => {
            return {...state, favorites: action.payload}
        }
    },
})
export const { activeUser, changeFavorites } = UserSlice.actions
export type User = {
    username: string | null,
    email: string | null,
    userID: string | null,
    languageSetting: string | null,
    favorites: Cocktail[] | null
}

export default UserSlice.reducer;
