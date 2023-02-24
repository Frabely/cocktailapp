import HeaderHome from "../../home/HeaderHome";
import CocktailList from "../../home/CocktailList";
import Header from "../../layout/Header";
import LoadingScreen from "../../layout/LoadingScreen";
import Modal from "../../layout/Modal";
import AppBackground from "../../layout/AppBackground";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {Cocktail, Language} from "../../../constants/types";
import {applySyncFilters} from "../../../functions/filterFunctions";
import {changeModalMessage} from "../../../reducers/general/modalMessageReducer";
import {invertIsModalState} from "../../../reducers/general/booleans/isModalReducer";

export default function Favorites({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [isFavoritesModalShown, setIsFavoritesModalShown] = useState(false);
    const language: Language = state.language
    const [favDataSet, setFavDataSet] = useState<Cocktail[] | null>(null);

    useEffect(() => {
        if (state.user.favorites) {
            let dataSet: Cocktail[] = state.user.favorites
            dataSet = applySyncFilters(dataSet, state, dispatch)
            setFavDataSet(dataSet)
            if (!isFavoritesModalShown) {
                dispatch(changeModalMessage(language.labels.YOUR_FAVORITES))
                dispatch(invertIsModalState())
                setIsFavoritesModalShown(true)
            }
        }
    }, [
        state.alcoholicFilter,
        state.sortFilter,
        state.categoryFilter,
        state.ingredientsFilter,
        state.currentSearchFieldInput,
        state.user.favorites
    ])

    return (
        <AppBackground>
            <HeaderHome/>
            <CocktailList dataset={favDataSet ? favDataSet : []}/>
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
