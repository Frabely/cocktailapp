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
import CurrentSearchFieldInputSlice from "../reducers/home/currentSearchFieldInputReducer";
import LanguageSlice from "../reducers/user/languageReducer";
import isModalSlice from "../reducers/booleans/isModalReducer";
import modalMessageSlice from "../reducers/general/modalMessageReducer"
import loginStateSlice from "../reducers/login/loginStateReducer"
import isCreatingAccountSlice from "../reducers/login/isCreatingAccountReducer"
import DimensionsSlice from "../reducers/general/screenSizeReducer"

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
    currentSearchFieldInput: CurrentSearchFieldInputSlice,
    language: LanguageSlice,
    isModal: isModalSlice,
    modalMessage: modalMessageSlice,
    loginState: loginStateSlice,
    isCreatingAccount: isCreatingAccountSlice,
    dimensions: DimensionsSlice
})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


