import {vh, vh_reactive} from "../../functions/dimentions";
import {ALL, EMPTY_ITEM, FILTER, SEARCH_FIELD} from "../../constants/const_vars";
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
import {changeAlcoholic} from "../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../reducers/filter/categoryFilterReducer";
import {changeCurrentSearchFieldInput} from "../../reducers/home/currentSearchFieldInputReducer";
import {changeIngredients} from "../../reducers/filter/ingredientsFilterReducer";

export default function CocktailList({}: CocktailListProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [numberCol, setNumberCol] = useState(15);

    useEffect(()=>{
        if (state.currentItem.idDrink)
            setNumberCol(5)
        else
            setNumberCol(10)
    },[state.currentItem.idDrink])

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
        <View style={[styles.cocktailList, {height: vh_reactive(0.8, state.dimensions.height)}]}>
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
                        // key={numberCol}
                        numColumns={3}
                        data={state.currentDataSet}
                        renderItem={renderItem}
                        keyExtractor={item => '#' + item.idDrink}
                    />
                </View>) : (
                <View style={{flexDirection: 'row', height: '100%'}}>
                    <FlatList
                        columnWrapperStyle={{justifyContent: 'space-around'}}
                        key={numberCol}
                        style={{flex: 1}}
                        numColumns={numberCol}
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
    )
}

const styles = StyleSheet.create({
    cocktailList: {
        height: vh(0.8),
        width: '100%',
        padding: PADDING,
    },
});

export type CocktailListProps = {}
