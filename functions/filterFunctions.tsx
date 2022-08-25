import {ALL, EMPTY_ITEM} from "../constants/const_vars";
import {changeCurrentItem} from "../reducers/home/currentItemReducer";
import {fetchFullDataSetAsArray, getFavoritesList} from "./firebase";
import {Cocktail} from "../constants/types";

export const filterAlcoholic = (prevDataSet: any[], state: any) => {
    const alcoholFilteredData: any[] = prevDataSet.filter((item) => {
        if (state.alcoholicFilter[0] === ALL || item.strAlcoholic === state.alcoholicFilter[0])
            return item
    })
    return alcoholFilteredData
}

export const filterCategory = (prevDataSet: any[], state: any) => {
    const categoryFilteredData: any[] = prevDataSet.filter((item) => {
        if (state.categoryFilter.includes(ALL))
            return item
        else {
            let isFiltered = false
            state.categoryFilter.forEach((itemFilter: any) => {
                if (itemFilter === item.strCategory) {
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

export const filterSearchField = (prevDataSet: any[], state: any, dispatch: any) => {
    const searchFieldFilteredData: any[] = prevDataSet.filter((item) => {
        const inputLowerNoSpace = state.currentSearchFieldInput.toLowerCase().replace(" ", "")
        const itemNameLowerNoSpace = item.strDrink.toLowerCase().replace(" ", "")
        if (itemNameLowerNoSpace.includes(inputLowerNoSpace)) {
            return item
        }
    })
    if (searchFieldFilteredData.length === 0 || !searchFieldFilteredData.includes(state.currentItem)) {
        dispatch(changeCurrentItem(EMPTY_ITEM))
    }
    return searchFieldFilteredData
}

export const filterIngredients = (prevDataSet: any[], state: any) => {
    let ingredientsFilteredData: any[] = prevDataSet
    if (state.ingredientsFilter.length !== 0) {
        ingredientsFilteredData = prevDataSet.filter((item) => {
            let isFiltered = false
            state.ingredientsFilter.forEach((itemFilter: string) => {
                for (let index: number = 1; index < 16; index++) {
                    if (item[`strIngredient${index}`] !== null) {
                        const itemFilterLowerNoSpace = itemFilter.toLowerCase().replace(" ", "")
                        const itemNameLowerNoSpace = item[`strIngredient${index}`].toLowerCase().replace(" ", "")
                        if (itemFilterLowerNoSpace === itemNameLowerNoSpace) {
                            isFiltered = true
                        }
                    }
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

export const filterFavorites = async (prevDataSet: any[], state: any) => {
    let favArray: any = []
    let favoritesFilteredData: any = []
    if (!state.user.userID)
        return
    await getFavoritesList(state.user.userID).then(result => {
        favArray = result
    }).catch(error => {
        console.log(error.message)
        alert(error.message)
    })
    if (favArray && favArray !== []) {
        favoritesFilteredData = prevDataSet.filter((item) => {
            let isFavoriteFiltered = false
            favArray.forEach((itemFilter: any) => {
                if (item['idDrink'] !== null) {
                    if (item['idDrink'] === itemFilter.id) {
                        isFavoriteFiltered = true
                    }
                }
            })
            if (isFavoriteFiltered) {
                isFavoriteFiltered = false
                return item
            }
        })
    }
    return favoritesFilteredData
}

export const applySyncFilters = (prevDataSet: any[], state: any, dispatch: any) => {
    let newDataSet: any []
    newDataSet = filterAlcoholic(prevDataSet, state)
    newDataSet = filterCategory(newDataSet, state)
    newDataSet = filterSearchField(newDataSet, state, dispatch)
    newDataSet = filterIngredients(newDataSet, state)
    return newDataSet
}

export const getFavoriteDataSet = async (userID: string) => {
    return getFavoritesList(userID).then((stringArrayOfIDs: string[] | undefined) => {
        if (!stringArrayOfIDs) {
            return undefined
        }
        return fetchFullDataSetAsArray({favoriteIDArray: stringArrayOfIDs}).then(
            (cocktailArrayFavorites: Cocktail[] | undefined) => {
                if (!cocktailArrayFavorites) {
                    return undefined
                }
                return cocktailArrayFavorites
            }).catch(error => {
            console.log(error.message)
            return undefined
        })
    }).catch(error => {
        console.log(error.message)
        alert(error.message)
        return undefined
    })
}
