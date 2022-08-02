import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import alcoholicFilterSlice from "../reducers/Filter/alcoholicFilterReducer";
import glassTypeFilterSlice from "../reducers/Filter/glassTypeFilterReducer";
import categoryFilterSlice from "../reducers/Filter/categoryFilterReducer";

const rootReducer = combineReducers({
    alcoholicFilter: alcoholicFilterSlice,
    glassTypeFilter: glassTypeFilterSlice,
    category: categoryFilterSlice
})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


