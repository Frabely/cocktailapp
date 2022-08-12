import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import alcoholicFilterSlice from "../reducers/filter/alcoholicFilterReducer";
import glassTypeFilterSlice from "../reducers/filter/glassTypeFilterReducer";
import categoryFilterSlice from "../reducers/filter/categoryFilterReducer";
import applyFilterSlice from "../reducers/booleans/isApplyFiltersReducer";
import ingredientsFilterSlice from "../reducers/filter/ingredientsFilterReducer";
import UserSlice from "../reducers/user/userReducer"
import isLoadingSlice from "../reducers/booleans/isLoadingReducer"
import activeFilterSlice from "../reducers/filter/activeFilterReducer"
import currentAppScreenSlice from "../reducers/currentAppScreenReducer"

const rootReducer = combineReducers({
    alcoholicFilter: alcoholicFilterSlice,
    glassTypeFilter: glassTypeFilterSlice,
    categoryFilter: categoryFilterSlice,
    applyFilters: applyFilterSlice,
    ingredientsFilter: ingredientsFilterSlice,
    user: UserSlice,
    isLoading: isLoadingSlice,
    activeFilter: activeFilterSlice,
    currentAppScreen: currentAppScreenSlice

})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


