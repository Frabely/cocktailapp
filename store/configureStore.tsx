import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import alcoholicFilterSlice from "../reducers/Filter/alcoholicFilterReducer";

const rootReducer = combineReducers({
    alcoholicFilter: alcoholicFilterSlice
})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


