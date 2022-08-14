import {User} from "../reducers/user/userReducer";

export const ALL = 'All'
export const FILTER = 'filter'
export const SEARCH_FIELD = 'searchField'
export const INGREDIENTS_FILTER_SELECTION_NUMBER_MAX = 3
export const INGREDIENTS_FILTER_SELECTION_NUMBER_MIN = 0
export const CREATE_ACCOUNT = 'createAccount'
export const EMPTY_USER: User = {email: null, username: null}

//main pages
export const HOME = 'home'
export const LOGIN = 'login'
export const PROFILE = 'profile'

// profile pages
export const PROFILE_DETAILS = 'profileDetails'
export const SETTINGS = 'settings'
export const FAVORITES = 'favorites'

