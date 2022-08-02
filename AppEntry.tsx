import dummyData from "./dummyData3";
import {useEffect, useRef, useState} from "react";
import {Animated, FlatList, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "./constants/hooks";
import {vh} from "./functions/dimentions";
import Card from "./component/Card";
import Header from "./component/Header";
import Filter from "./component/Menu/Filter";
import HighlightedCard from "./component/HighlightedCard";
import {COLOR_BACKGROUND} from "./constants/color_styles";
import {PADDING} from "./constants/border_margin_padding_defaults";
import {invertApplyFiltersState} from "./reducers/Filter/applyFiltersReducer";
import {ALL} from "./constants/const_vars";

const data = dummyData.drinks;
export default function AppEntry() {
    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentDataSet, setCurrentDataSet] = useState(data)
    const [isFilterIconPressed, setIsFilterIconPressed] = useState(false)
    const openMenuAnimation = useRef(new Animated.Value(0)).current;
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    console.log('render')

    useEffect(() => {
        {
            let filterData = []
            filterData = data.filter((item) => {
                if (state.alcoholicFilter[0] === ALL || item.strAlcoholic === state.alcoholicFilter[0])
                    return item
            })
            console.log(filterData)
            setCurrentDataSet(filterData)
        }
    }, [state.applyFilters])

    const setIsFilterIconPressedAnimation = () => {
        if (!isFilterIconPressed) {
            open()
        } else {
            close()
        }

    }

    const open = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(openMenuAnimation, {
            toValue: vh(0.8),
            duration: 500,
            useNativeDriver: false
        }).start(() => {
            setIsFilterIconPressed(true)
        });
    };

    const close = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        setIsFilterIconPressed(false)
        Animated.timing(openMenuAnimation, {
            toValue: vh(0),
            duration: 500,
            useNativeDriver: false
        }).start()
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
            <Header setIsFilterIconPressedAnimation={setIsFilterIconPressedAnimation}
                    isFilterIconPressed={isFilterIconPressed}/>
            <View style={styles.app}>
                <Filter isFilterIconPressed={isFilterIconPressed} openMenuAnimation={openMenuAnimation}/>
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
