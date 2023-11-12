import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RatedCocktail, UserIDCocktailIDType} from "../../constants/types";

const initialState: RatedCocktail[] = []

const CocktailRatingSlice = createSlice({
    name: 'cocktailRating',
    initialState: initialState,
    reducers: {
        changeRatedCocktailArray: (state, action: PayloadAction<RatedCocktail[]>) => {
            return action.payload
        },
        addUserForCurrentCocktail: (state, action: PayloadAction<UserIDCocktailIDType>) => {
            let isStateSet = false
            state.map((ratedCocktailObject: RatedCocktail) => {
                if (ratedCocktailObject.cocktailID === action.payload.cocktailID) {
                    ratedCocktailObject.userIDList.push(action.payload.userID)
                    isStateSet = true
                }
            })
            if (isStateSet)
                return state
            else {
                const userList: string[] = []
                userList.push(action.payload.userID)
                const ratedCocktail: RatedCocktail = {
                    cocktailID: action.payload.cocktailID,
                    userIDList: userList
                }
                state.push(ratedCocktail)
                return state
            }
        },
        removeUserForCurrentCocktail: (state, action: PayloadAction<UserIDCocktailIDType>) => {
            state.map((ratedCocktailObject: RatedCocktail) => {
                if (ratedCocktailObject.cocktailID === action.payload.cocktailID) {
                    const indexUser = ratedCocktailObject.userIDList.indexOf(action.payload.userID)
                    if (indexUser !== -1) {
                        ratedCocktailObject.userIDList.splice(indexUser, 1)
                    }
                    return state
                }
            })
            return state
        },
    },
})
export const {
    changeRatedCocktailArray,
    addUserForCurrentCocktail,
    removeUserForCurrentCocktail
} = CocktailRatingSlice.actions


export default CocktailRatingSlice.reducer;
