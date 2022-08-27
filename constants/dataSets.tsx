import {fetchFullDataSetAsArray} from "../functions/firebase";
import data from "../constants/dummyData3";
import {Cocktail} from "./types";

const getDataFromFile = async () => {
    return data['drinks']
}

// export const FULL_DATA_SET_PROMISE: Promise<Cocktail[] | undefined> = fetchFullDataSetAsArray()
export const FULL_DATA_SET_PROMISE: Promise<Cocktail[] | undefined> = getDataFromFile()
