import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EMPTY_USER} from "../../constants/const_vars";
import {Cocktail, User} from "../../constants/types";

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

export default UserSlice.reducer;
