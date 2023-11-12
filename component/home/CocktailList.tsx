import {vh, vh_reactive} from "../../functions/dimentions";
import {ALL, DEFAULT_SORT, EMPTY_ITEM, FILTER, SEARCH_FIELD} from "../../constants/const_vars";
import Filter from "./filter/Filter";
import SearchField from "./search_field/SearchField";
import NoHits from "./NoHits";
import {FlatList, StyleSheet, View} from "react-native";
import HighlightedCard from "./highlighted_card/HighlightedCard";
import {PADDING} from "../../constants/style_constants";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import Card from "../layout/Card";
import {Cocktail} from "../../constants/types";
import {changeCurrentItem} from "../../reducers/home/currentItemReducer";
import {Orientation} from 'expo-screen-orientation';
import {changeAlcoholic} from "../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../reducers/filter/categoryFilterReducer";
import {changeCurrentSearchFieldInput} from "../../reducers/home/currentSearchFieldInputReducer";
import {changeIngredients} from "../../reducers/filter/ingredientsFilterReducer";
import {changeSort} from "../../reducers/filter/sortFilterReducer";
import {updateRatingCocktail} from "../../functions/databaseUpdate";

export default function CocktailList({dataset}: CocktailListProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [numberCol, setNumberCol] = useState(15);

    useEffect(() => {
        if (state.currentItem.idDrink)
            setNumberCol(5)
        else
            setNumberCol(10)
    }, [state.currentItem.idDrink])

    const onImageClickHandler = (
        currentlyClickedItem: Cocktail,
        item: Cocktail) => {
        updateRatingCocktail(state).catch(error => console.log(error.message))
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
        dispatch(changeSort([DEFAULT_SORT]))
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
        <View style={[styles.cocktailList, {height: vh_reactive(0.8, state.dimensions.height)}]}>
            {state.activeFilter === FILTER ? (
                <Filter lengthDataSet={dataset.length} onPress={onClearAllFiltersClickHandler}/>
            ) : null}
            {dataset.length === 0 && !state.isLoading ? (
                    <>
                        {state.activeFilter === SEARCH_FIELD ? (
                            <SearchField/>
                        ) : null}
                        <NoHits onPress={onClearAllFiltersClickHandler}/>
                    </>
                ) :
                (
                    <>
                        {state.dimensions.orientationInfo === Orientation.PORTRAIT_UP ? (
                            <View style={{flexDirection: 'column', height: '100%'}}>
                                {state.activeFilter === SEARCH_FIELD ? (
                                    <SearchField/>
                                ) : null}
                                {(state.currentItem.idDrink) ? (
                                    <HighlightedCard/>
                                ) : null
                                }
                                <FlatList
                                    columnWrapperStyle={{justifyContent: 'space-around'}}
                                    numColumns={3}
                                    data={dataset}
                                    renderItem={renderItem}
                                    keyExtractor={item => '#' + item.idDrink}
                                />
                            </View>) : (
                            <View style={{flexDirection: 'row', height: '100%'}}>
                                <View style={{flex: 1}}>
                                    {state.activeFilter === SEARCH_FIELD ? (
                                        <SearchField/>
                                    ) : null}
                                    <FlatList
                                        columnWrapperStyle={{justifyContent: 'space-around'}}
                                        key={numberCol}
                                        numColumns={numberCol}
                                        data={dataset}
                                        renderItem={renderItem}
                                        keyExtractor={item => '_' + item.idDrink}
                                        extraData={state.currentItem.idDrink}/>
                                </View>
                                {(state.currentItem.idDrink) ? (
                                    <View style={{flex: 1}}>
                                        <HighlightedCard
                                            height={vh_reactive(0.8, state.dimensions.height) - PADDING * 2}/>
                                    </View>
                                ) : null}
                            </View>
                        )}
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    cocktailList: {
        height: vh(0.8),
        width: '100%',
        padding: PADDING,
    },
});

export type CocktailListProps = {
    dataset: Cocktail[]
}
