import dummyData from "./dummyData3";
import {useEffect, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {useAppSelector} from "./constants/hooks";
import {vh} from "./functions/dimentions";
import Card from "./component/Card";
import Header from "./component/Header";
import Filter from "./component/Menu/Filter/Filter";
import SearchField from "./component/Menu/SearchField/SearchField";
import HighlightedCard from "./component/HighlightedCard";
import {COLOR_BACKGROUND} from "./constants/color_styles";
import {PADDING} from "./constants/style_constants";
import {ALL, FILTER, SEARCH_FIELD} from "./constants/const_vars";
import {StatusBar} from "expo-status-bar";

const data: any[] = dummyData.drinks;
export default function AppEntry() {
    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentDataSet, setCurrentDataSet] = useState(data)
    const [currentSearchFieldInput, setCurrentSearchFieldInput] = useState('')
    const [activeFilter, setActiveFilter] = useState('')
    const state = useAppSelector((state) => state)

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
                    // console.log(currentSearchFieldInput)
                    const inputLowerNoSpace = currentSearchFieldInput.toLowerCase().replace(" ", "")
                    const itemNameLowerNoSpace = item.strDrink.toLowerCase().replace(" ", "")
                    if (itemNameLowerNoSpace.includes(inputLowerNoSpace)) {
                        return item
                    }
                })
                if (searchFieldFilteredData.length === 0 || !searchFieldFilteredData.includes(currentItem)) {
                    setCurrentItem(undefined)
                }
                console.log(searchFieldFilteredData)
                setCurrentDataSet(searchFieldFilteredData)
            }
        }
        ,
        [state.alcoholicFilter, state.category, currentSearchFieldInput]
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
            <Header setActiveFilter={setActiveFilter}
                    activeFilter={activeFilter}
            />
            <View style={styles.app}>
                {(activeFilter === FILTER) && (
                    <Filter setCurrentSearchFieldInput={setCurrentSearchFieldInput}
                            setActiveFilter={setActiveFilter}
                            currentDataSetLength={currentDataSet.length}
                    />
                )}
                {(activeFilter === SEARCH_FIELD) && (
                    <SearchField setCurrentSearchFieldInput={setCurrentSearchFieldInput}
                                 setActiveFilter={setActiveFilter}
                                 currentSearchFieldInput={currentSearchFieldInput}
                                 currentDataSetLength={currentDataSet.length}
                    />
                )}
                {currentItem && (
                    <HighlightedCard item={currentItem} onImageClickHandler={onImageClickHandler}/>
                )}
                <FlatList
                    numColumns={3}
                    data={currentDataSet}
                    renderItem={renderItem}
                    keyExtractor={item => item.idDrink}/>
                <StatusBar style="auto"/>
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
