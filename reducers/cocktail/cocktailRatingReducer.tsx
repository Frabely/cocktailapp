import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cocktail, RatedCocktail, UserIDCocktailIDType} from "../../constants/types";
import {FULL_DATA_SET} from "../../constants/dataSets"

const initialState: RatedCocktail[] = []

const CocktailRatingSlice = createSlice({
    name: 'cocktailRating',
    initialState: initialState,
    reducers: {
        initRatedCocktailArray: () => {
            // const getRatingLists = () => {
            let ratingList: RatedCocktail[] = []
            FULL_DATA_SET.map((cocktail: Cocktail) => {
                if (cocktail.idDrink && cocktail.ratingUserIDList) {
                    const ratedCocktailItem: RatedCocktail = {
                        cocktailID: cocktail.idDrink,
                        userIDList: cocktail.ratingUserIDList
                    }
                    ratingList.push(ratedCocktailItem)
                }
            })
            return ratingList
            // }

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
            state.map((ratedCocktailObject: RatedCocktail, index: number) => {
                if (ratedCocktailObject.cocktailID === action.payload.cocktailID) {
                    const indexUser = ratedCocktailObject.userIDList.indexOf(action.payload.userID)
                    if (indexUser !== -1) {
                        ratedCocktailObject.userIDList.splice(indexUser, 1)
                        if (ratedCocktailObject.userIDList.length === 0) {
                            state.splice(index, 1)
                        }
                    }
                    return state
                }
            })
            return state
        },
    },
})
export const {
    initRatedCocktailArray,
    addUserForCurrentCocktail,
    removeUserForCurrentCocktail
} = CocktailRatingSlice.actions


export default CocktailRatingSlice.reducer;
