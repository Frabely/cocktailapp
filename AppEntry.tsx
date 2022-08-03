import dummyData from "./dummyData3";
import {useEffect, useRef, useState} from "react";
import {Animated, FlatList, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "./constants/hooks";
import {vh} from "./functions/dimentions";
import Card from "./component/Card";
import Header from "./component/Header";
import Filter from "./component/Menu/Filter/Filter";
import SearchField from "./component/Menu/SearchField/SearchField";
import HighlightedCard from "./component/HighlightedCard";
import {COLOR_BACKGROUND} from "./constants/color_styles";
import {PADDING} from "./constants/border_margin_padding_defaults";
import {invertApplyFiltersState} from "./reducers/Filter/applyFiltersReducer";
import {ALL} from "./constants/const_vars";

const data: any[] = dummyData.drinks;
export default function AppEntry() {
    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentDataSet, setCurrentDataSet] = useState(data)
    // const [isHeaderIconPressed, setIsHeaderIconPressed] = useState(false)
    const [isFilterIconPressed, setIsFilterIconPressed] = useState(false)
    const [isSearchFieldIconPressed, setIsSearchFieldIconPressed] = useState(false)
    const [currentSearchFieldInput, setCurrentSearchFieldInput] = useState('')

    const openMenuAnimation = useRef(new Animated.Value(0)).current;
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    useEffect(() => {
            {
                const alcoholFilteredData: any[] = data.filter((item) => {
                    if (state.alcoholicFilter[0] === ALL || item.strAlcoholic === state.alcoholicFilter[0])
                        return item
                })
                const categoryFilteredData: any[] = alcoholFilteredData.filter((item) => {
                    if (state.category.includes(ALL))
                        return item
                    else {
                        let isFiltered = false
                        state.category.forEach((itemFilter) => {
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
                console.log(searchFieldFilteredData)
                setCurrentDataSet(searchFieldFilteredData)
            }
        }
        ,
        [state.alcoholicFilter, state.category, currentSearchFieldInput]
    )

    const setIsHeaderIconPressedAnimation = (headerIconPressed: string) => {
        // TODO make selection of filter better => possible make a reusable component for header elements
        let vhValue: number = 0
        if (headerIconPressed === 'filter') {
            if (isFilterIconPressed) {
                close()
                return
            }
            vhValue = 0.8
        }

        if (headerIconPressed === 'searchField') {
            if (isSearchFieldIconPressed) {
                close()
                return
            }
            vhValue = 0.1
        }
        if (!isFilterIconPressed && !isSearchFieldIconPressed) {
            open(vhValue, headerIconPressed)
        }
        if (!isFilterIconPressed && isSearchFieldIconPressed || isFilterIconPressed && !isSearchFieldIconPressed) {
            close()
            open(vhValue, headerIconPressed)
        }
    }

    const open = (vhValue: number, iconPressed: string) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(openMenuAnimation, {
            toValue: vh(vhValue),
            duration: 500,
            useNativeDriver: false
        }).start(() => {
            if (iconPressed === 'filter')
                setIsFilterIconPressed(true)
            if (iconPressed === 'searchField')
                setIsSearchFieldIconPressed(true)
        });
    };

    const close = (callback?: any, callbackParams?: any[]) => {
        // Will change fadeAnim value to 0 in 5 seconds
        setIsFilterIconPressed(false)
        setIsSearchFieldIconPressed(false)
        Animated.timing(openMenuAnimation, {
            toValue: vh(0),
            duration: 500,
            useNativeDriver: false
        }).start(() => {
                if (callback && callbackParams)
                    callback(callbackParams[0], callbackParams[1])
            }
        )
        dispatch(invertApplyFiltersState())
    };


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

    const renderItem = ({item, index}: any) => {
        return (
            <Card key={item.idDrink}
                  item={item}
                  currentItem={currentItem}
                  onImageClickHandler={onImageClickHandler}
            />
        )
    }

    return (
        <>
            <Header setIsHeaderIconPressedAnimation={setIsHeaderIconPressedAnimation}
                    setIsSearchFieldIconPressed={setIsSearchFieldIconPressed}
                    setIsFilterIconPressed={setIsFilterIconPressed}
                    isFilterIconPressed={isFilterIconPressed}
                    isSearchFieldIconPressed={isSearchFieldIconPressed}
            />
            <View style={styles.app}>
                {/*{isFilterIconPressed && (*/}
                    <Filter setIsFilterIconPressed={setIsFilterIconPressed}
                            isFilterIconPressed={isFilterIconPressed}
                            openMenuAnimation={openMenuAnimation}
                            closeFilterHandler={close}
                            setCurrentSearchFieldInput={setCurrentSearchFieldInput}
                    />
                {/*)}*/}
                {isSearchFieldIconPressed && (
                    <SearchField setIsSearchFieldIconPressed={setIsSearchFieldIconPressed}
                                 openMenuAnimation={openMenuAnimation}
                                 isSearchFieldIconPressed={isSearchFieldIconPressed}
                                 setCurrentSearchFieldInput={setCurrentSearchFieldInput}
                                 currentSearchFieldInput={currentSearchFieldInput}/>
                )}
                {currentItem && (
                    <HighlightedCard item={currentItem} onImageClickHandler={onImageClickHandler}/>
                )}
                <FlatList
                    numColumns={3}
                    data={currentDataSet}
                    renderItem={renderItem}
                    keyExtractor={item => item.idDrink}/>
                {/*<StatusBar style="auto"/>*/}
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    app: {
        backgroundColor: COLOR_BACKGROUND,
        height: vh(0.9),
        width: '100%',
        padding: PADDING,
    }
});
