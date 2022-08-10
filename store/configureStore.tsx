import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import alcoholicFilterSlice from "../reducers/filter/alcoholicFilterReducer";
import glassTypeFilterSlice from "../reducers/filter/glassTypeFilterReducer";
import categoryFilterSlice from "../reducers/filter/categoryFilterReducer";
import applyFilterSlice from "../reducers/filter/applyFiltersReducer";
import ingredientsFilterSlice from "../reducers/filter/ingredientsFilterReducer";

const rootReducer = combineReducers({
    alcoholicFilter: alcoholicFilterSlice,
    glassTypeFilter: glassTypeFilterSlice,
    categoryFilter: categoryFilterSlice,
    applyFilters: applyFilterSlice,
    ingredientsFilter: ingredientsFilterSlice
})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


