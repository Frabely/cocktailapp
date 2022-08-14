import dummyData, {Cocktail} from "../../constants/dummyData3";
import {useEffect, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {vh} from "../../functions/dimentions";
import Card from "../layout/Card";
import Header from "../layout/Header";
import Filter from "../home/filter/Filter";
import SearchField from "../home/search_field/SearchField";
import HighlightedCard from "../home/highlighted_card/HighlightedCard";
import NoHits from "../home/NoHits"
import {PADDING} from "../../constants/style_constants";
import {ALL, EMPTY_ITEM, FILTER, SEARCH_FIELD} from "../../constants/const_vars";
import {changeAlcoholic} from "../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../reducers/filter/categoryFilterReducer";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../reducers/booleans/isLoadingReducer";
import HeaderHome from "../home/HeaderHome";
import AppBackground from "../layout/AppBackground";
import {changeCurrentItem} from "../../reducers/home/currentItemReducer";

const data: any[] = dummyData.drinks;
export default function Home({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [currentDataSet, setCurrentDataSet] = useState(data)
    const [currentSearchFieldInput, setCurrentSearchFieldInput] = useState('')
    const [ingredientsValue, setIngredientsValue] = useState(state.ingredientsFilter)

    useEffect(() => {
        setCurrentDataSet(data)
        onClearAllFiltersClickHandler()
    }, [])

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
                const inputLowerNoSpace = currentSearchFieldInput.toLowerCase().replace(" ", "")
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
                    state.ingredientsFilter.forEach((itemFilter) => {
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
                setCurrentDataSet(ingredientsFilteredData)
            } else {
                setCurrentDataSet(searchFieldFilteredData)
            }

            dispatch(setIsLoadingFalse())
            //TODO set timeout so see Loading spinner
            // }, 2000);

        }
        ,
        [state.alcoholicFilter, state.categoryFilter, state.ingredientsFilter, currentSearchFieldInput]
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
        setCurrentSearchFieldInput('')
        setIngredientsValue([])
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
                            <Filter setCurrentSearchFieldInput={setCurrentSearchFieldInput}
                                    currentDataSetLength={currentDataSet.length}
                                    onClearAllFiltersClickHandler={onClearAllFiltersClickHandler}
                                    ingredientsValue={ingredientsValue}
                                    setIngredientsValue={setIngredientsValue}/>
                        ) : null}
                        {(state.activeFilter === SEARCH_FIELD) ? (
                            <SearchField setCurrentSearchFieldInput={setCurrentSearchFieldInput}
                                         currentSearchFieldInput={currentSearchFieldInput}
                                         currentDataSetLength={currentDataSet.length}/>
                        ) : null}
                        {(state.currentItem.idDrink === '') ? (
                            <HighlightedCard onImageClickHandler={onImageClickHandler}/>
                        ) : null}
                        {(currentDataSet.length === 0) ? (
                            <NoHits onClearAllFiltersClickHandler={onClearAllFiltersClickHandler}/>
                        ) : null}
                        <FlatList
                            numColumns={3}
                            data={currentDataSet}
                            renderItem={renderItem}
                            keyExtractor={item => item.idDrink}/>
                    </View>
                    <Header
                        navigation={navigation}

                    />
            {/*{state.isLoading ? (*/}
            {/*    <LoadingScreen/>*/}
            {/*) : null}*/}
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
