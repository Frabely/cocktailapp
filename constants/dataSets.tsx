import {fetchFullDataSetAsArray} from "../functions/firebase";
import data from "../constants/dummyData3";
import {Cocktail} from "./types";

export type NewCocktail = {
    cocktail: Cocktail,
    cocktailRatingArray: string[]
}


const getDataFromFileWithRatingArray = async () => {
    const newFullDataSetWithRatingArray: Cocktail[] = []
    data.drinks.map((item: any) => {
        const newObject: any = {...item, ratingUserIDList: []}
        newFullDataSetWithRatingArray.push(newObject)
    })
    return newFullDataSetWithRatingArray
}

const getDataFromFile = async () => {
    return data['drinks']
}

// export const FULL_DATA_SET_PROMISE: Promise<Cocktail[] | undefined> = fetchFullDataSetAsArray()
export const FULL_DATA_SET_PROMISE: Promise<Cocktail[] | undefined> = getDataFromFileWithRatingArray()

getDataFromFileWithRatingArray().then((dataSet: Cocktail[] | undefined) => {
    if (dataSet)
        FULL_DATA_SET = dataSet
})

export let FULL_DATA_SET: Cocktail[] = []

