import dummyData from "../../../constants/dummyData3";
import {useEffect} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {vh} from "../../../functions/dimentions";
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

const data: Cocktail[] = dummyData.drinks;
export default function CocktailList({route, navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        let dataSet: Cocktail[] = []
        if (route.name === FAVORITES) {
            dispatch(setIsLoadingTrue())
            filterFavorites(data, state).then((result => {
                dataSet = applySyncFilters(result, state, dispatch)
                dispatch(setIsLoadingFalse())
                dispatch(changeCurrentDataSet(dataSet))
            }))
        } else {
            dataSet = applySyncFilters(data, state, dispatch)
            dispatch(changeCurrentDataSet(dataSet))
        }
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
            <View style={styles.app}>
                {(state.activeFilter === FILTER) ? (
                    <Filter onClearAllFiltersClickHandler={onClearAllFiltersClickHandler}/>
                ) : null}
                {(state.activeFilter === SEARCH_FIELD) ? (
                    <SearchField/>
                ) : null}
                {state.currentItem.idDrink ? (
                    <HighlightedCard/>
                ) : null}
                {(state.currentDataSet.length === 0) ? (
                    <NoHits onClearAllFiltersClickHandler={onClearAllFiltersClickHandler}/>
                ) : null}
                <FlatList
                    numColumns={3}
                    data={state.currentDataSet}
                    renderItem={renderItem}
                    //TODO use keyExtractor
                    // keyExtractor={item => item.idDrink}
                />
            </View>
            <Header navigation={navigation}/>
            {state.isLoading ? (
                <LoadingScreen/>
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
