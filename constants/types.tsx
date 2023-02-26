import {IconProp} from "@fortawesome/fontawesome-svg-core";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export type LabelType = {
    [index: string]: string
    en: string,
    de: string
}

export type ErrorCodesType = {
    [index: string]: string | LabelType
    code: string,
    messageKey: string
}

export type LabelListType = {
    [index: string]: readonly string[]
    en: string[],
    de: string[]
}

export type CocktailListType = {
    [index: string]: readonly Cocktail[]
    drinks: Cocktail[]
}

export type RatedCocktail = {
    [index: string]: string[] | string,
    cocktailID: string,
    userIDList: string[]
}

export type IconTitleObject = {
    icon: IconProp,
    titleENG: string
}

export type User = {
    username: string | null,
    email: string | null,
    userID: string | null,
    languageSetting: string | null,
    favorites: Cocktail[] | null
}

export type UserIDCocktailIDType = {
    [index: string]: string,
    userID: string
    cocktailID: string,
}

export type Ingredient = {
    "idIngredient": string | null,
    "alcoholVolume": number | null
}

export type DropDownMenuType = {
    label: string,
    value: string,
}

// export type Cocktail = {
//     "idDrink": string | null,
//     "strDrink": string | null,
//     "strDrinkAlternate": string | null,
//     "strTags": string | null,
//     "strVideo": string | null,
//     "strCategory": string | null,
//     "strIBA": string | null,
//     "strAlcoholic": string | null,
//     "strGlass": string | null,
//     "strInstructions": string | null,
//     "strInstructionsES": string | null,
//     "strInstructionsDE": string | null,
//     "strInstructionsFR": string | null,
//     "strInstructionsIT": string | null,
//     "strInstructionsZH-HANS": string | null,
//     "strInstructionsZH-HANT": string | null,
//     "strDrinkThumb": string | null,
//     "strIngredient1": string | null,
//     "strIngredient2": string | null,
//     "strIngredient3": string | null,
//     "strIngredient4": string | null,
//     "strIngredient5": string | null,
//     "strIngredient6": string | null,
//     "strIngredient7": string | null,
//     "strIngredient8": string | null,
//     "strIngredient9": string | null,
//     "strIngredient10": string | null,
//     "strIngredient11": string | null,
//     "strIngredient12": string | null,
//     "strIngredient13": string | null,
//     "strIngredient14": string | null,
//     "strIngredient15": string | null,
//     "strMeasure1": string | null,
//     "strMeasure2": string | null,
//     "strMeasure3": string | null,
//     "strMeasure4": string | null,
//     "strMeasure5": string | null,
//     "strMeasure6": string | null,
//     "strMeasure7": string | null,
//     "strMeasure8": string | null,
//     "strMeasure9": string | null,
//     "strMeasure10": string | null,
//     "strMeasure11": string | null,
//     "strMeasure12": string | null,
//     "strMeasure13": string | null,
//     "strMeasure14": string | null,
//     "strMeasure15": string | null,
//     "strImageSource": string | null,
//     "strImageAttribution": string | null,
//     "strCreativeCommonsConfirmed": string | null,
//     "dateModified": string | null,
//     "ratingUserIDList": string[] | null
// }

export type Cocktail = {
    idDrink: string | null,
    name: string | null,
    glass: string | null,
    instruction: string | null,
    alcoholic: boolean | null,
    category: string | null,
    ingredientsList: Ingredient[] | null,
    liquidMeasuresML: number[] | null,
    ingredientsOptionalList: string[] | null,
    dateModified: Timestamp | null,
    ratingUserIDList: string[] | null
}

export type Language = {
    [index: string]: string | Labels | any,
    langKey: string,
    "drinks": any,
    "ingredients": any
    "labels": Labels
}

export type Labels = {
    [index: string]: string | string[] | {[index: string]: string},
    "USERNAME_LABEL": string,
    "EMAIL_LABEL": string,
    "OLD_PASSWORD_LABEL": string,
    "NEW_PASSWORD_LABEL": string,
    "PASSWORD_LABEL": string,
    "REPEAT_PASSWORD_LABEL": string,
    "FINISH_ACCOUNT_CREATION_LABEL": string,
    "LOGIN_LABEL": string,
    "SEND_RESET_PASSWORD_EMAIL_LABEL": string,
    "RESET_PASSWORD_EMAIL_SENT_LABEL": string,
    "FORGOT_PASSWORD_LABEL": string,
    "CREATE_ACCOUNT_LABEL": string,
    "CHANGE_PASSWORD_LABEL": string,
    "CHANGE_USERNAME_LABEL": string,
    "SEARCH_INGREDIENTS_LABEL": string,
    "ALL_LABEL": string,
    "ALCOHOLIC_LABEL": string,
    "CATEGORY_LABEL": string,
    "INGREDIENTS_LABEL": string,
    "CLEAR_ALL_FILTERS_LABEL": string,
    "HITS_LABEL": string,
    "ENTER_SEARCH_TERM_LABEL": string,
    "RESET_FILTER_LABEL": string,
    "NO_HITS_LABEL": string,
    "IN_DEVELOPMENT_LABEL": string,
    "LANGUAGE_LABEL": string,
    "ENGLISH_LABEL": string,
    "GERMAN_LABEL": string,
    "SAVE_SETTINGS_LABEL": string,
    "CLOSE": string,
    "FAVORITE_DELETED_LABEL": string,
    "SORT_LABEL": string,
    "PREPARATION_LABEL": string,
    "GLASS_LABEL": string,
    "ACCOUNT_CREATED_VERIFY_EMAIL": string,
    "USERNAME_SUCCESSFUL_CHANGED": string,
    "PASSWORD_SUCCESSFUL_CHANGED": string,
    "USER_PROFILE_LABEL": string,
    "PROFILE_DETAILS_LABEL": string,
    "SETTINGS_LABEL": string,
    "FAVORITES_LABEL": string,
    "YOUR_FAVORITES": string,
    "LOGOUT_LABEL": string,
    "SORT_LIST": string[],
    CATEGORY_LIST: string[],
    ALCOHOLIC_LIST: string[],
    "ERROR_CODES": {
        [index: string]: string
        "USERNAME_MISSING": string,
        "USERNAME_ALREADY_USED": string,
        "EMAIL_MISSING": string,
        "OLD_PASSWORD_MISSING": string,
        "NEW_PASSWORD_MISSING": string,
        "PASSWORD_MISSING": string,
        "REPEAT_PASSWORD_MISSING": string,
        "PASSWORDS_NOT_MATCHING": string,
        "OLD_AND_NEW_PASSWORDS_MATCHING": string,
        "EMAIL_NOT_VERIFIED": string,
        "WRONG_PASSWORD": string,
        "USER_NOT_FOUND": string,
        "TOO_MANY_REQUESTS": string,
        "WEAK_PASSWORD": string,
        "INVALID_EMAIL": string,
        "EMAIL_ALREADY_IN_USE": string,
        "NETWORK_REQUEST_FAILED": string
    }
}
