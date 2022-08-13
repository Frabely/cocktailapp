import dummyData from "../../constants/dummyData3";
import {useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {vh} from "../../functions/dimentions";
import Card from "../layout/Card";
import Header from "../layout/Header";
import Filter from "../home/filter/Filter";
import SearchField from "../home/search_field/SearchField";
import HighlightedCard from "../home/highlighted_card/HighlightedCard";
import NoHits from "../home/NoHits"
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {PADDING} from "../../constants/style_constants";
import {ALL, FILTER, HOME, LOGIN, PROFILE, SEARCH_FIELD, PROFILE_DETAILS} from "../../constants/const_vars";
import {changeAlcoholic} from "../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../reducers/filter/categoryFilterReducer";
import LoadingScreen from "../layout/LoadingScreen";
import LoginScreen from "./LoginScreen";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../reducers/booleans/isLoadingReducer";
import UserProfile from "./UserProfile";
import {setActiveFilter} from "../../reducers/filter/activeFilterReducer";
import ProfileDetails from "./user_profile/ProfileDetails";

const data: any[] = dummyData.drinks;
export default function Home() {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentDataSet, setCurrentDataSet] = useState(data)
    const [currentSearchFieldInput, setCurrentSearchFieldInput] = useState('')
    const [ingredientsValue, setIngredientsValue] = useState(state.ingredientsFilter)

    useEffect(() => {
        setCurrentDataSet(data)
        onClearAllFiltersClickHandler()
        dispatch(setActiveFilter(''))
    }, [state.currentAppScreen])

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

    return (
        <View style={{backgroundColor: COLOR_BACKGROUND}}>
            <Image style={{position: 'absolute', height: '100%', width: '100%'}}
                             source={require('../../assets/images/adaptive_background.png')}/>
            {(state.currentAppScreen === PROFILE) ? (
                <>
                    <UserProfile/>
                    <Header/>
                </>
            ) : null}
            {(state.currentAppScreen === PROFILE_DETAILS) ? (
                <>
                    <ProfileDetails/>
                    <Header/>
                </>
            ) : null}
            {(state.currentAppScreen === HOME) ? (
                <>
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
                        {currentItem ? (
                            <HighlightedCard item={currentItem} onImageClickHandler={onImageClickHandler}/>
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
                    <Header/>
                </>
            ) : null}
            {(state.currentAppScreen === LOGIN) ? (
                <LoginScreen/>
            ) : null}
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
        </View>
    )
}
const styles = StyleSheet.create({
    app: {
        height: vh(0.9),
        width: '100%',
        padding: PADDING,
    },
});
