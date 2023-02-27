import {ALCOHOLIC, ALL, EMPTY_ITEM, NON_ALCOHOLIC, SORT_LIST} from "../constants/const_vars";
import {changeCurrentItem} from "../reducers/home/currentItemReducer";
import {Cocktail, Ingredient} from "../constants/types";


const sortAZ = (cocktailOne: Cocktail, cocktailTwo: Cocktail) => {
    if (cocktailOne.name && cocktailTwo.name) {
        const strDrinkA = cocktailOne.name.toUpperCase(); // ignore upper and lowercase
        const strDrinkB = cocktailTwo.name.toUpperCase(); // ignore upper and lowercase
        if (strDrinkA < strDrinkB) {
            return -1; //strDrinkA comes first
        }
        if (strDrinkA > strDrinkB) {
            return 1; // strDrinkB comes first
        }
    }
    return 0;  // names must be equal
}

const sortZA = (cocktailOne: Cocktail, cocktailTwo: Cocktail) => {
    if (cocktailOne.name && cocktailTwo.name) {
        const strDrinkA = cocktailOne.name.toUpperCase(); // ignore upper and lowercase
        const strDrinkB = cocktailTwo.name.toUpperCase(); // ignore upper and lowercase
        if (strDrinkA > strDrinkB) {
            return -1; //strDrinkA comes first
        }
        if (strDrinkA < strDrinkB) {
            return 1; // strDrinkB comes first
        }
    }
    return 0;  // names must be equal
}

const sortFavorites = (cocktailOne: Cocktail, cocktailTwo: Cocktail) => {
    //TODO sort own liked before other liked with same lenth
    if (cocktailOne.ratingUserIDList && cocktailTwo.ratingUserIDList) {
        const favLengthDrinkA = cocktailOne.ratingUserIDList.length; // length favorites
        const favLengthDrinkB = cocktailTwo.ratingUserIDList.length; // length favorites
        if (favLengthDrinkA > favLengthDrinkB) {
            return -1; //favLengthDrinkA comes first
        }
        if (favLengthDrinkA < favLengthDrinkB) {
            return 1; // favLengthDrinkB comes first
        }
    }
    return 0;  // names must be equal
}

export const filterSort = (prevDataSet: Cocktail[], state: any) => {
    let newArray: Cocktail[] = []
    if (state.sortFilter[0] === SORT_LIST[0]) {
        newArray = prevDataSet.slice().sort(sortAZ)
    }
    if (state.sortFilter[0] === SORT_LIST[1]) {
        newArray = prevDataSet.slice().sort(sortZA)
    }
    if (state.sortFilter[0] === SORT_LIST[2]) {
        newArray = prevDataSet.slice().sort(sortFavorites)
    }
    return newArray
}

export const filterAlcoholic = (prevDataSet: Cocktail[], state: any) => {
    const alcoholFilteredData: Cocktail[] = prevDataSet.filter((item: Cocktail) => {
        if (state.alcoholicFilter[0] === ALL ||
            item.alcoholic && state.alcoholicFilter[0] === ALCOHOLIC ||
            !item.alcoholic && state.alcoholicFilter[0] === NON_ALCOHOLIC
        )
            return item
    })
    return alcoholFilteredData
}

export const filterCategory = (prevDataSet: Cocktail[], state: any) => {
    const categoryFilteredData: Cocktail[] = prevDataSet.filter((item: Cocktail) => {
        if (state.categoryFilter.includes(ALL))
            return item
        else {
            let isFiltered = false
            state.categoryFilter.forEach((itemFilter: string) => {
                if (itemFilter === item.category) {
                    isFiltered = true
                }
            })
            if (isFiltered) {
                isFiltered = false
                return item
            }
        }
    })
    return categoryFilteredData
}

export const filterSearchField = (prevDataSet: Cocktail[], state: any, dispatch: any) => {
    const searchFieldFilteredData: Cocktail[] = prevDataSet.filter((item: Cocktail) => {
        if (state.language.drinks[`${item.idDrink}`].name) {
            const inputLowerNoSpace = state.currentSearchFieldInput.toLowerCase().replace(" ", "")
            const itemNameLowerNoSpace = state.language.drinks[`${item.idDrink}`].name.toLowerCase().replace(" ", "")
            if (itemNameLowerNoSpace.includes(inputLowerNoSpace)) {
                return item
            }
        }
    })
    if (searchFieldFilteredData.length === 0 || !searchFieldFilteredData.includes(state.currentItem)) {
        dispatch(changeCurrentItem(EMPTY_ITEM))
    }
    return searchFieldFilteredData
}

export const filterIngredients = (prevDataSet: Cocktail[], state: any) => {
    let ingredientsFilteredData: Cocktail[] = prevDataSet
    if (state.ingredientsFilter.length !== 0) {
        ingredientsFilteredData = prevDataSet.filter((item: Cocktail) => {
            let isFiltered: boolean = false
            state.ingredientsFilter.forEach((itemFilter: string) => {
                if (item.ingredientsList) {
                    item.ingredientsList.map((ingredient: Ingredient) => {
                        if (itemFilter === ingredient.idIngredient) {
                            isFiltered = true
                        }
                    })
                }
            })
            if (isFiltered) {
                isFiltered = false
                return item
            }
        })
    }
    return ingredientsFilteredData
}

export const applySyncFilters = (prevDataSet: Cocktail[], state: any, dispatch: any) => {
    let newDataSet: Cocktail []
    newDataSet = filterSort(prevDataSet, state)
    newDataSet = filterAlcoholic(newDataSet, state)
    newDataSet = filterCategory(newDataSet, state)
    newDataSet = filterSearchField(newDataSet, state, dispatch)
    //TODO fix ingredients filter
    newDataSet = filterIngredients(newDataSet, state)
    return newDataSet
}

export const fetchFavoriteDataSetAsArray = (favoriteIDArray: string[], dataSet: Cocktail[]) => {
    let returnArray: Cocktail[] = []
    dataSet.map((item: Cocktail) => {
        if (item.idDrink) {
            if (favoriteIDArray.includes(item.idDrink)) {
                returnArray.push(item)
            }
        }
    })
    return returnArray
}
