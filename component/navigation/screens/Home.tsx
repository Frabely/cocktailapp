import React, {useEffect, useState} from "react";
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
import {FULL_DATA_SET_PROMISE} from "../../../constants/dataSets";

export default function Home({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [dataSet, setDataSet] = useState<Cocktail[] | null >(null);

    useEffect(() => {
        dispatch(setIsLoadingTrue())
        let dataSet: Cocktail[] = []
        FULL_DATA_SET_PROMISE.then(resultData => {
            if (resultData) {
                dataSet = applySyncFilters(resultData, state, dispatch)
                dispatch(setIsLoadingFalse())
                setDataSet(dataSet)
            }
        }).catch(error => {
            dispatch(setIsLoadingFalse())
            console.log(error.message)
        })
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
