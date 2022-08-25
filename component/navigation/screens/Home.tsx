import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import Header from "../../layout/Header";
import {FAVORITES} from "../../../constants/const_vars";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../reducers/booleans/isLoadingReducer";
import HeaderHome from "../../home/HeaderHome";
import AppBackground from "../../layout/AppBackground";
import {changeCurrentDataSet} from "../../../reducers/home/currentDataSetReducer";
import LoadingScreen from "../../layout/LoadingScreen";
import {
    filterFavorites,
    applySyncFilters
} from "../../../functions/filterFunctions";
import {Cocktail} from "../../../constants/types";
import {changeModalMessage} from "../../../reducers/general/modalMessageReducer";
import {YOUR_FAVORITES} from "../../../constants/labels";
import {invertIsModalState} from "../../../reducers/booleans/isModalReducer";
import Modal from "../../layout/Modal";
import {fetchFullDataSetAsArray} from "../../../functions/firebase";
import CocktailList from "../../home/CocktailList";

export default function Home({route, navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const isFavorites = route.name === FAVORITES
    const language: string = state.language
    const [isFavoritesModalShown, setIsFavoritesModalShown] = useState(false);

    useEffect(() => {
        dispatch(setIsLoadingTrue())
        let dataSet: Cocktail[] = []
        fetchFullDataSetAsArray().then(resultData => {
            if (resultData) {
                if (isFavorites) {
                    dispatch(setIsLoadingTrue())
                    filterFavorites(resultData, state).then((result => {
                        dataSet = applySyncFilters(result, state, dispatch)
                        dispatch(setIsLoadingFalse())
                        dispatch(changeCurrentDataSet(dataSet))
                        if (!isFavoritesModalShown) {
                            dispatch(changeModalMessage(YOUR_FAVORITES[`${language}`]))
                            dispatch(invertIsModalState())
                            setIsFavoritesModalShown(true)
                        }
                    }))
                } else {
                    dispatch(setIsLoadingFalse())
                    dataSet = applySyncFilters(resultData, state, dispatch)
                    dispatch(changeCurrentDataSet(dataSet))
                }
            }
        }).catch(error => {
            dispatch(setIsLoadingFalse())
            console.log(error.message)
        })
    }, [state.alcoholicFilter, state.categoryFilter, state.ingredientsFilter, state.currentSearchFieldInput])

    return (
        <AppBackground>
            <HeaderHome/>
            <CocktailList/>
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
const styles = StyleSheet.create({
    // app: {
    //     height: vh(0.8),
    //     width: '100%',
    //     padding: PADDING,
    // },
});
