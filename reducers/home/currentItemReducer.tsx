import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EMPTY_ITEM} from "../../constants/const_vars";
import {Cocktail} from "../../constants/types";

const CurrentItemSlice = createSlice({
    name: 'currentItem',
    initialState: EMPTY_ITEM,
    reducers: {
        changeCurrentItem: (state, action: PayloadAction<Cocktail>) => {
            return action.payload
        },
        addUserToRatingList: (state, action: PayloadAction<string>) => {
            if (state.ratingUserIDList) {
                const returnUserIDList = state.ratingUserIDList
                returnUserIDList.push(action.payload)
                const returnState: Cocktail = state
                returnState.ratingUserIDList = returnUserIDList
                return returnState
            }
        },
        removeUserFromRatingList: (state, action: PayloadAction<string>) => {
            if (state.ratingUserIDList) {
                const returnUserIDList: string[]  = state.ratingUserIDList
                returnUserIDList.map((userID: string, index: number) => {
                    if (userID === action.payload) {
                        returnUserIDList.splice(index)
                    }
                })
                const returnState: Cocktail = state
                returnState.ratingUserIDList = returnUserIDList
                return returnState
            }
        }
    },
})
export const { changeCurrentItem, addUserToRatingList, removeUserFromRatingList } = CurrentItemSlice.actions

export default CurrentItemSlice.reducer;
