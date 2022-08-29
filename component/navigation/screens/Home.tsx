import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import Header from "../../layout/Header";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../reducers/general/booleans/isLoadingReducer";
import HeaderHome from "../../home/HeaderHome";
import AppBackground from "../../layout/AppBackground";
import LoadingScreen from "../../layout/LoadingScreen";
import {
    applySyncFilters
} from "../../../functions/filterFunctions";
import {Cocktail} from "../../../constants/types";
import Modal from "../../layout/Modal";
import CocktailList from "../../home/CocktailList";

export default function Home({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    let dataSet = state.dataSet

    useEffect(() => {
        dispatch(setIsLoadingTrue())
        let newDataSet: Cocktail[]
        if (dataSet) {
            newDataSet = applySyncFilters(dataSet, state, dispatch)
            dispatch(setIsLoadingFalse())
            dataSet = newDataSet
        }
    }, [state.alcoholicFilter, state.categoryFilter, state.ingredientsFilter, state.currentSearchFieldInput])

    return (
        <AppBackground>
            <HeaderHome/>
            <CocktailList dataset={dataSet ? dataSet : []}/>
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
