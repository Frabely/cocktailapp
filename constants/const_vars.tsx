import {Cocktail, User} from "./types";

export const ALL = 'All'
export const DEFAULT_SORT = 'AlphabeticalAZ'
export const FILTER = 'filter'
export const SEARCH_FIELD = 'searchField'
export const INGREDIENTS_FILTER_SELECTION_NUMBER_MAX = 3
export const INGREDIENTS_FILTER_SELECTION_NUMBER_MIN = 0
export const EMPTY_USER: User = {email: null, username: null, userID: null, languageSetting: null, favorites: null}
export const ENGLISH: string = 'en'
export const GERMAN: string = 'de'
export const EMPTY_ITEM: Cocktail = {
    idDrink: null,
    name: null,
    glass: null,
    instruction: null,
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
export const DRINKS_DB = 'drinks'

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

export const SORT_LIST: string[] = ['AlphabeticalAZ', 'AlphabeticalZA', 'Favorites']


// profile pages
export const PROFILE_DETAILS = 'profileDetails'
export const SETTINGS = 'settings'
export const FAVORITES = 'favorites'

