import dummyData, {Cocktail} from "../../../constants/dummyData3";
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
import {ALL, EMPTY_ITEM, FILTER, SEARCH_FIELD} from "../../../constants/const_vars";
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

const data: any[] = dummyData.drinks;
export default function Home({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     onClearAllFiltersClickHandler()
    // }, [])

    useEffect(() => {
            dispatch(setIsLoadingTrue())
            // TODO set timeout so see Loading spinner
            // setTimeout(() => {
            const alcoholFilteredData: any[] = data.filter((item) => {
                if (state.alcoholicFilter[0] === ALL || item.strAlcoholic === state.alcoholicFilter[0])
                    return item
            })
            const categoryFilteredData: any[] = alcoholFilteredData.filter((item) => {
                if (state.categoryFilter.includes(ALL))
                    return item
                else {
                    let isFiltered = false
                    state.categoryFilter.forEach((itemFilter) => {
                        if (itemFilter === item.strCategory) {
                            isFiltered = true
                        }
                    })
                    if (isFiltered) {
                        isFiltered = false
                        return item
                    }
                }
            })
            const searchFieldFilteredData: any[] = categoryFilteredData.filter((item) => {
                const inputLowerNoSpace = state.currentSearchFieldInput.toLowerCase().replace(" ", "")
                const itemNameLowerNoSpace = item.strDrink.toLowerCase().replace(" ", "")
                if (itemNameLowerNoSpace.includes(inputLowerNoSpace)) {
                    return item
                }
            })

            if (searchFieldFilteredData.length === 0 || !searchFieldFilteredData.includes(state.currentItem)) {
                dispatch(changeCurrentItem(EMPTY_ITEM))
            }
            if (state.ingredientsFilter.length !== 0) {
                const ingredientsFilteredData: any[] = searchFieldFilteredData.filter((item) => {
                    let isFiltered = false
                    state.ingredientsFilter.forEach((itemFilter: string) => {
                        for (let index: number = 1; index < 16; index++) {
                            if (item[`strIngredient${index}`] !== null) {
                                const itemFilterLowerNoSpace = itemFilter.toLowerCase().replace(" ", "")
                                const itemNameLowerNoSpace = item[`strIngredient${index}`].toLowerCase().replace(" ", "")
                                if (itemFilterLowerNoSpace === itemNameLowerNoSpace) {
                                    isFiltered = true
                                }
                            }
                        }
                    })
                    if (isFiltered) {
                        isFiltered = false
                        return item
                    }
                })
                dispatch(changeCurrentDataSet(ingredientsFilteredData))
            } else {
                dispatch(changeCurrentDataSet(searchFieldFilteredData))
            }

            dispatch(setIsLoadingFalse())
            //TODO set timeout so see Loading spinner
            // }, 2000);

        }
        ,
        [state.alcoholicFilter, state.categoryFilter, state.ingredientsFilter, state.currentSearchFieldInput]
    )

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

    const renderItem = ({item}: any) => {
        return (
            <Card key={item.idDrink}
                  item={item}
                  onImageClickHandler={onImageClickHandler}/>
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
                    keyExtractor={item => item.idDrink}/>
            </View>
            <Header
                navigation={navigation}

            />
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
