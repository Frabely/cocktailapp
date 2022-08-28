import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cocktail, RatedCocktail, UserIDCocktailIDType} from "../../constants/types";
import {FULL_DATA_SET} from "../../constants/dataSets"

const getRatingLists = () => {
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
}

const initialState: RatedCocktail[] = getRatingLists()

const CocktailRatingSlice = createSlice({
    name: 'cocktailRating',
    initialState: initialState,
    reducers: {
        addUserForCurrentCocktail: (state, action: PayloadAction<UserIDCocktailIDType>) => {
            state.map((ratedCocktailObject: RatedCocktail) => {
                if (ratedCocktailObject.cocktailID === action.payload.cocktailID) {
                    ratedCocktailObject.userIDList.push(action.payload.userID)
                    return state
                }
            })
            const userList: string[] = []
            userList.push(action.payload.userID)
            const ratedCocktail: RatedCocktail = {
                cocktailID: action.payload.cocktailID,
                userIDList: userList
            }
            state.push(ratedCocktail)
            return state
        },
        removeUserForCurrentCocktail: (state, action: PayloadAction<UserIDCocktailIDType>) => {
            state.map((ratedCocktailObject: RatedCocktail, index: number) => {
                if (ratedCocktailObject.cocktailID === action.payload.cocktailID) {
                    const indexUser = ratedCocktailObject.userIDList.indexOf(action.payload.userID)
                    if (indexUser !== -1){
                        ratedCocktailObject.userIDList.splice(indexUser)
                        if (ratedCocktailObject.userIDList.length === 0) {
                            state.splice(index)
                        }
                    }
                    return state
                }
            })
            return state
        },
    },
})
export const {addUserForCurrentCocktail, removeUserForCurrentCocktail} = CocktailRatingSlice.actions


export default CocktailRatingSlice.reducer;
