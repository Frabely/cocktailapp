import HeaderHome from "../../home/HeaderHome";
import CocktailList from "../../home/CocktailList";
import Header from "../../layout/Header";
import LoadingScreen from "../../layout/LoadingScreen";
import Modal from "../../layout/Modal";
import AppBackground from "../../layout/AppBackground";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {Cocktail} from "../../../constants/types";
import {changeCurrentDataSet} from "../../../reducers/home/currentDataSetReducer";
import {applySyncFilters} from "../../../functions/filterFunctions";
import {changeModalMessage} from "../../../reducers/general/modalMessageReducer";
import {YOUR_FAVORITES} from "../../../constants/labels";
import {invertIsModalState} from "../../../reducers/booleans/isModalReducer";

export default function Favorites({route, navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [isFavoritesModalShown, setIsFavoritesModalShown] = useState(false);
    const language: string = state.language

    useEffect(() => {
        console.log(state.user.favorites)
        if (state.user.favorites) {
            let dataSet: Cocktail[] = state.user.favorites
            console.log(dataSet)
            dispatch(changeCurrentDataSet(dataSet))
            console.log(dataSet)
            dataSet = applySyncFilters(dataSet, state, dispatch)
            console.log(dataSet)
            dispatch(changeCurrentDataSet(dataSet))
            if (!isFavoritesModalShown) {
                dispatch(changeModalMessage(YOUR_FAVORITES[`${language}`]))
                dispatch(invertIsModalState())
                setIsFavoritesModalShown(true)
            }
        }
    }, [state.alcoholicFilter, state.categoryFilter, state.ingredientsFilter, state.currentSearchFieldInput])

    return (
        <AppBackground>
            <HeaderHome/>
            <CocktailList route={route}/>
            <Header navigation={navigation}/>
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
            {state.isModal ? (
                <Modal message={state.modalMessage}/>
            ) : null}
        </AppBackground>
    )
}
