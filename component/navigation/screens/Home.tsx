import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import Header from "../../layout/Header";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../reducers/booleans/isLoadingReducer";
import HeaderHome from "../../home/HeaderHome";
import AppBackground from "../../layout/AppBackground";
import {changeCurrentDataSet} from "../../../reducers/home/currentDataSetReducer";
import LoadingScreen from "../../layout/LoadingScreen";
import {
    applySyncFilters
} from "../../../functions/filterFunctions";
import {Cocktail} from "../../../constants/types";
import Modal from "../../layout/Modal";
import {fetchFullDataSetAsArray} from "../../../functions/firebase";
import CocktailList from "../../home/CocktailList";

export default function Home({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setIsLoadingTrue())
        let dataSet: Cocktail[] = []
        fetchFullDataSetAsArray().then(resultData => {
            if (resultData) {
                dispatch(setIsLoadingFalse())
                dataSet = applySyncFilters(resultData, state, dispatch)
                dispatch(changeCurrentDataSet(dataSet))
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
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
            <Header navigation={navigation}/>
            {state.isModal ? (
                <Modal message={state.modalMessage}/>
            ) : null}
        </AppBackground>
    )
}
