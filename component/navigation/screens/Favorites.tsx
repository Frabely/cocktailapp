import HeaderHome from "../../home/HeaderHome";
import CocktailList from "../../home/CocktailList";
import Header from "../../layout/Header";
import LoadingScreen from "../../layout/LoadingScreen";
import Modal from "../../layout/Modal";
import AppBackground from "../../layout/AppBackground";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {fetchFavoriteDataSetAsArray} from "../../../functions/firebase";

export default function Favorites({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.user.userID) {
            fetchFavoriteDataSetAsArray(state.user.userID).then()
        }
    })

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
