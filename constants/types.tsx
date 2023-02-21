import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type LabelType = {
    [index: string]: string
    ENG: string,
    GER: string
}

export type ErrorCodesType = {
    [index: string]: string | LabelType
    code: string,
    message: LabelType
}

export type LabelListType = {
    [index: string]: readonly string[]
    ENG: string[],
    GER: string[]
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

export type UserIDCocktailIDType = {
    [index: string]: string,
    userID: string
    cocktailID: string,
}

export type Ingredient = {
    "idIngredient": string | null,
    "name": string | null,
    "alcoholVolume": number | null
}

export type Cocktail = {
    "idDrink": string | null,
    "strDrink": string | null,
    "strDrinkAlternate": string | null,
    "strTags": string | null,
    "strVideo": string | null,
    "strCategory": string | null,
    "strIBA": string | null,
    "strAlcoholic": string | null,
    "strGlass": string | null,
    "strInstructions": string | null,
    "strInstructionsES": string | null,
    "strInstructionsDE": string | null,
    "strInstructionsFR": string | null,
    "strInstructionsIT": string | null,
    "strInstructionsZH-HANS": string | null,
    "strInstructionsZH-HANT": string | null,
    "strDrinkThumb": string | null,
    "strIngredient1": string | null,
    "strIngredient2": string | null,
    "strIngredient3": string | null,
    "strIngredient4": string | null,
    "strIngredient5": string | null,
    "strIngredient6": string | null,
    "strIngredient7": string | null,
    "strIngredient8": string | null,
    "strIngredient9": string | null,
    "strIngredient10": string | null,
    "strIngredient11": string | null,
    "strIngredient12": string | null,
    "strIngredient13": string | null,
    "strIngredient14": string | null,
    "strIngredient15": string | null,
    "strMeasure1": string | null,
    "strMeasure2": string | null,
    "strMeasure3": string | null,
    "strMeasure4": string | null,
    "strMeasure5": string | null,
    "strMeasure6": string | null,
    "strMeasure7": string | null,
    "strMeasure8": string | null,
    "strMeasure9": string | null,
    "strMeasure10": string | null,
    "strMeasure11": string | null,
    "strMeasure12": string | null,
    "strMeasure13": string | null,
    "strMeasure14": string | null,
    "strMeasure15": string | null,
    "strImageSource": string | null,
    "strImageAttribution": string | null,
    "strCreativeCommonsConfirmed": string | null,
    "dateModified": string | null,
    "ratingUserIDList": string[] | null
}
