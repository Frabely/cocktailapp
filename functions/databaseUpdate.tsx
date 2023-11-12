import {updateCocktailRatingList, updateUser} from "./firebase";
import {Cocktail, RatedCocktail} from "../constants/types";
import {RootState} from "../store/configureStore";

export const updateRatingCocktail = async (state: RootState) => {
    const currentRatedCocktail = state.cocktailRating.find(
        (ratedCocktail: RatedCocktail) => ratedCocktail.cocktailID === state.currentItem.idDrink
    )
    if (state.user.userID && currentRatedCocktail && state.currentItem.idDrink) {
        let userFavoriteCocktailList: string[] = []
        if (state.user.userID && state.user.favorites) {
            state.user.favorites.map((cocktail: Cocktail) => {
                if (cocktail.idDrink)
                    userFavoriteCocktailList.push(cocktail.idDrink)
            })
        }
        updateCocktailRatingList(currentRatedCocktail).catch(error => console.error(error.message))
        updateUser(state.user.userID, {favorites: userFavoriteCocktailList}).catch(error => console.error(error.message))
    }
}
