import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dimensions} from "react-native";
import {Orientation} from "expo-screen-orientation";

export type DimensionsType = {
    orientationInfo: Orientation
    width: number,
    height: number
}

const initialState: DimensionsType = {
    orientationInfo: Orientation.PORTRAIT_UP,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

const DimensionsSlice = createSlice({
    name: 'dimensions',
    initialState: initialState,
    reducers: {
        changeHeight: (state, action: PayloadAction<number>) => {
            let objNew: DimensionsType = {...initialState, height: action.payload}
            return objNew
        },
        changeWidth: (state, action: PayloadAction<number>) => {
            let objNew: DimensionsType = {...initialState, width: action.payload}
            return objNew
        },
        changeScreen: (state, action: PayloadAction<DimensionsType>) => {
            return action.payload
        },
        changeOrientationInfo: (state, action: PayloadAction<Orientation>) => {
            return {...state, orientationInfo: action.payload}
        }
    },
})
export const { changeHeight, changeWidth, changeScreen } = DimensionsSlice.actions

export default DimensionsSlice.reducer;
