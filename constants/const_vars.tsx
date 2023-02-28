import {Cocktail, User} from "./types";
export const ALL = 'all'
export const DEFAULT_SORT = 'alphabeticalAZ'
export const FILTER = 'filter'
export const SEARCH_FIELD = 'searchField'
export const INGREDIENTS_FILTER_SELECTION_NUMBER_MAX = 3
export const INGREDIENTS_FILTER_SELECTION_NUMBER_MIN = 0
export const EMPTY_USER: User = {
    email: null,
    username: null,
    userID: null,
    languageSetting: null,
    unitOfMeasureForLiquidsSetting: null,
    favorites: null}
export const ENGLISH: string = 'en'
export const GERMAN: string = 'de'
export const MILLILITERS: string = 'ml'
export const EMPTY_ITEM: Cocktail = {
    idDrink: null,
    alcoholic: null,
    category: null,
    ingredientsList: null,
    liquidMeasuresML: null,
    ingredientsOptionalList: null,
    dateModified: null,
    ratingUserIDList: null
}

//database paths
export const USERS_DB = 'users'
export const USER_FAVORITES_DB = 'favorites'
export const DRINKS_DB = 'ownDrinks'

export const INGREDIENTS = 'ingredients'

export const CATEGORIES = 'categories'

//database attributes
export const USER_USERNAME_LOWER_DB = "usernameLower"
export const USER_FAVORITES_DRINK_ID_DB = "drinkID"

//main pages
export const HOME = 'home'
export const LOGIN = 'login'
export const FORGOT_PASSWORD = 'forgotPassword'
export const CREATE_ACCOUNT = 'createAccount'
export const PROFILE = 'profile'

//TODO rework to use page const above

export const CREATE_ACCOUNT_LABEL = 'Create Account'
export const CHANGE_USERNAME_LABEL = 'Change Username'
export const CHANGE_PASSWORD_LABEL = 'Change Password'
export const LOGIN_LABEL = 'Login'
export const FORGOT_PASSWORD_LABEL = 'Forgot Password?'
export const ALCOHOLIC = "alcoholic"
export const NON_ALCOHOLIC = "nonAlcoholic"
export const ALCOHOLIC_KEY_LIST = [ALL, ALCOHOLIC, NON_ALCOHOLIC]
export const SORT_LIST: string[] = ['alphabeticalAZ', 'alphabeticalZA', 'favorites']


// profile pages
export const PROFILE_DETAILS = 'profileDetails'
export const SETTINGS = 'settings'
export const FAVORITES = 'favorites'

