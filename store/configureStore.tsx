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
import currentItemSlice from "../reducers/home/currentItemReducer";
import CurrentDataSetSlice from "../reducers/home/currentDataSetReducer";
import CurrentSearchFieldInputSlice from "../reducers/home/currentSearchFieldInputReducer";

const rootReducer = combineReducers({
    alcoholicFilter: alcoholicFilterSlice,
    glassTypeFilter: glassTypeFilterSlice,
    categoryFilter: categoryFilterSlice,
    applyFilters: applyFilterSlice,
    ingredientsFilter: ingredientsFilterSlice,
    user: UserSlice,
    isLoading: isLoadingSlice,
    activeFilter: activeFilterSlice,
    currentItem: currentItemSlice,
    currentDataSet: CurrentDataSetSlice,
    currentSearchFieldInput: CurrentSearchFieldInputSlice
})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


