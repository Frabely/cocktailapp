import {User} from "../reducers/user/userReducer";
import {Cocktail} from "./dummyData3";

export const ALL = 'All'
export const FILTER = 'filter'
export const SEARCH_FIELD = 'searchField'
export const INGREDIENTS_FILTER_SELECTION_NUMBER_MAX = 3
export const INGREDIENTS_FILTER_SELECTION_NUMBER_MIN = 0
export const CREATE_ACCOUNT = 'Create Account'
export const EMPTY_USER: User = {email: null, username: null}
export const EMPTY_ITEM: Cocktail = {
    "idDrink": null,
    "strDrink": null,
    "strDrinkAlternate": null,
    "strTags": null,
    "strVideo": null,
    "strCategory": null,
    "strIBA": null,
    "strAlcoholic": null,
    "strGlass": null,
    "strInstructions": null,
    "strInstructionsES": null,
    "strInstructionsDE": null,
    "strInstructionsFR": null,
    "strInstructionsIT": null,
    "strInstructionsZH-HANS": null,
    "strInstructionsZH-HANT": null,
    "strDrinkThumb": null,
    "strIngredient1": null,
    "strIngredient2": null,
    "strIngredient3": null,
    "strIngredient4": null,
    "strIngredient5": null,
    "strIngredient6": null,
    "strIngredient7": null,
    "strIngredient8": null,
    "strIngredient9": null,
    "strIngredient10": null,
    "strIngredient11": null,
    "strIngredient12": null,
    "strIngredient13": null,
    "strIngredient14": null,
    "strIngredient15": null,
    "strMeasure1": null,
    "strMeasure2": null,
    "strMeasure3": null,
    "strMeasure4": null,
    "strMeasure5": null,
    "strMeasure6": null,
    "strMeasure7": null,
    "strMeasure8": null,
    "strMeasure9": null,
    "strMeasure10": null,
    "strMeasure11": null,
    "strMeasure12": null,
    "strMeasure13": null,
    "strMeasure14": null,
    "strMeasure15": null,
    "strImageSource": null,
    "strImageAttribution": null,
    "strCreativeCommonsConfirmed": null,
    "dateModified": null
}

//main pages
export const HOME = 'home'
export const LOGIN = 'login'
export const PROFILE = 'profile'

// profile pages
export const PROFILE_DETAILS = 'profileDetails'
export const SETTINGS = 'settings'
export const FAVORITES = 'favorites'

