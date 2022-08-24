import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {vh, vh_reactive} from "../../../functions/dimentions";
import Card from "../../layout/Card";
import Header from "../../layout/Header";
import Filter from "../../home/filter/Filter";
import SearchField from "../../home/search_field/SearchField";
import HighlightedCard from "../../home/highlighted_card/HighlightedCard";
import NoHits from "../../home/NoHits"
import {PADDING} from "../../../constants/style_constants";
import {ALL, EMPTY_ITEM, FAVORITES, FILTER, SEARCH_FIELD} from "../../../constants/const_vars";
import {changeAlcoholic} from "../../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../../reducers/filter/categoryFilterReducer";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../reducers/booleans/isLoadingReducer";
import HeaderHome from "../../home/HeaderHome";
import AppBackground from "../../layout/AppBackground";
import {changeCurrentItem} from "../../../reducers/home/currentItemReducer";
import {changeCurrentDataSet} from "../../../reducers/home/currentDataSetReducer";
import {changeCurrentSearchFieldInput} from "../../../reducers/home/currentSearchFieldInputReducer";
import {changeIngredients} from "../../../reducers/filter/ingredientsFilterReducer";
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
import {fetchDataSetAsArray} from "../../../functions/firebase";

export default function CocktailList({route, navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const isFavorites = route.name === FAVORITES
    const language: string = state.language
    const [isFavoritesModalShown, setIsFavoritesModalShown] = useState(false);

    useEffect(() => {
        dispatch(setIsLoadingTrue())
        let dataSet: Cocktail[] = []
        fetchDataSetAsArray().then(resultData => {
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

    const onImageClickHandler = (
        currentlyClickedItem: Cocktail,
        item: Cocktail) => {
        if (currentlyClickedItem) {
            if (currentlyClickedItem.idDrink === item.idDrink) {
                dispatch(changeCurrentItem(EMPTY_ITEM))
                return
            }
        }
        dispatch(changeCurrentItem(item))
    }

    const onClearAllFiltersClickHandler = () => {
        dispatch(changeAlcoholic([ALL]))
        dispatch(changeCategory([ALL]))
        dispatch(changeCurrentSearchFieldInput(''))
        dispatch(changeIngredients([]))
    }

    // TODO find out what any is
    const renderItem = ({item}: any) => {
        return (
            <Card key={item.idDrink}
                  item={item}
                  onPress={onImageClickHandler}/>
        )
    }

    return (
        <AppBackground>
            <HeaderHome/>
            <View style={[styles.app, {height: vh_reactive(0.8, state.dimensions.height)}]}>
                {(state.activeFilter === FILTER) ? (
                    <Filter onClearAllFiltersClickHandler={onClearAllFiltersClickHandler}/>
                ) : null}
                {(state.activeFilter === SEARCH_FIELD) ? (
                    <SearchField/>
                ) : null}
                {(state.currentDataSet.length === 0 && !state.isLoading) ? (
                    <NoHits onClearAllFiltersClickHandler={onClearAllFiltersClickHandler}/>
                ) : null}
                {(state.dimensions.height > state.dimensions.width) ? (
                    <View style={{flexDirection: 'column', height: '100%'}}>
                        {(state.currentItem.idDrink) ? (
                            <HighlightedCard/>
                        ) : null
                        }
                        <FlatList
                            columnWrapperStyle={{justifyContent: 'space-around'}}
                            key={'#'}
                            numColumns={3}
                            data={state.currentDataSet}
                            renderItem={renderItem}
                            keyExtractor={item => '#' + item.idDrink}
                        />
                    </View>) : (
                    <View style={{flexDirection: 'row', height: '100%'}}>
                        <FlatList
                            columnWrapperStyle={{justifyContent: 'space-around'}}
                            key={'_'}
                            style={{flex: 1}}
                            numColumns={6}
                            data={state.currentDataSet}
                            renderItem={renderItem}
                            keyExtractor={item => '_' + item.idDrink}
                            extraData={state.currentItem.idDrink}/>
                        {(state.currentItem.idDrink) ? (
                            <View style={{flex: 1}}>
                                <HighlightedCard height={vh_reactive(0.8, state.dimensions.height) - PADDING * 2}/>
                            </View>
                        ) : null}
                    </View>
                )}
            </View>
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
    app: {
        height: vh(0.8),
        width: '100%',
        padding: PADDING,
    },
});
