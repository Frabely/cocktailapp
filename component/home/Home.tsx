import dummyData from "../../constants/dummyData3";
import {useEffect, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {vh} from "../../functions/dimentions";
import Card from "../layout/Card";
import Header from "../layout/Header";
import Filter from "./menu/filter/Filter";
import SearchField from "./menu/search_field/SearchField";
import HighlightedCard from "./highlighted_card/HighlightedCard";
import NoHits from "./NoHits"
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {PADDING} from "../../constants/style_constants";
import {ALL, FILTER, SEARCH_FIELD} from "../../constants/const_vars";
import {StatusBar} from "expo-status-bar";
import {changeAlcoholic} from "../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../reducers/filter/categoryFilterReducer";
import LoadingScreen from "../layout/LoadingScreen";
import LoginScreen from "../login_screen/LoginScreen";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../reducers/booleans/isLoadingReducer";
import UserProfile from "../user_profile/UserProfile";

const data: any[] = dummyData.drinks;
export default function Home() {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentDataSet, setCurrentDataSet] = useState(data)
    const [currentSearchFieldInput, setCurrentSearchFieldInput] = useState('')
    const [ingredientsValue, setIngredientsValue] = useState(state.ingredientsFilter)

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

            if (searchFieldFilteredData.length === 0 || !searchFieldFilteredData.includes(currentItem)) {
                setCurrentItem(undefined)
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
        currentlyClickedItem: any,
        item: any) => {
        if (currentlyClickedItem) {
            if (currentlyClickedItem.idDrink === item.idDrink) {
                setCurrentItem(undefined)
                return
            }
        }
        setCurrentItem(item)
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
                  currentItem={currentItem}
                  onImageClickHandler={onImageClickHandler}/>
        )
    }

    console.log(currentItem)

    return (
        <>
            {(state.user !== null) && (
                <View style={{backgroundColor: COLOR_BACKGROUND}}>
                    <Header/>
                    <UserProfile/>
                    {/*<View style={styles.app}>*/}
                    {/*    {(state.activeFilter === FILTER) && (*/}
                    {/*        <Filter setCurrentSearchFieldInput={setCurrentSearchFieldInput}*/}
                    {/*                currentDataSetLength={currentDataSet.length}*/}
                    {/*                onClearAllFiltersClickHandler={onClearAllFiltersClickHandler}*/}
                    {/*                ingredientsValue={ingredientsValue}*/}
                    {/*                setIngredientsValue={setIngredientsValue}/>*/}
                    {/*    )}*/}
                    {/*    {(state.activeFilter === SEARCH_FIELD) && (*/}
                    {/*        <SearchField setCurrentSearchFieldInput={setCurrentSearchFieldInput}*/}
                    {/*                     currentSearchFieldInput={currentSearchFieldInput}*/}
                    {/*                     currentDataSetLength={currentDataSet.length}/>*/}
                    {/*    )}*/}
                    {/*    {currentItem && (*/}
                    {/*        <HighlightedCard item={currentItem} onImageClickHandler={onImageClickHandler}/>*/}
                    {/*    )}*/}
                    {/*    {(currentDataSet.length === 0) && (*/}
                    {/*        <NoHits onClearAllFiltersClickHandler={onClearAllFiltersClickHandler}/>*/}
                    {/*    )}*/}
                    {/*    <FlatList*/}
                    {/*        numColumns={3}*/}
                    {/*        data={currentDataSet}*/}
                    {/*        renderItem={renderItem}*/}
                    {/*        keyExtractor={item => item.idDrink}/>*/}
                    {/*    <StatusBar style="auto"/>*/}
                    {/*</View>*/}
                    {/*{state.isLoading && (*/}
                    {/*    <LoadingScreen/>*/}
                    {/*)}*/}
                </View>
            )}
            {(state.user === null) && (
                <LoginScreen/>
            )}
        </>
    )
}
const styles = StyleSheet.create({
    app: {
        backgroundColor: COLOR_BACKGROUND,
        height: vh(0.9),
        width: '100%',
        padding: PADDING,
    },
});
