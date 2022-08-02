import {StatusBar} from 'expo-status-bar';
import {Animated, FlatList, StyleSheet, View} from 'react-native';
import Card from "./component/Card";
import {useRef, useState} from "react";
import Header from "./component/Header";
import dummyData from "./dummyData3";
import {vh} from "./functions/dimentions";
import HighlightedCard from "./component/HighlightedCard";
import Filter from "./component/Menu/Filter";
import {COLOR_BACKGROUND} from "./constants/color_styles";
import {PADDING} from "./constants/border_margin_padding_defaults";
import {Provider as ReduxProvider} from "react-redux";
import store from "./store/configureStore"

const data = dummyData.drinks;

export default function App() {
    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentDataSet, setCurrentDataSet] = useState(data)
    const [isFilterIconPressed, setIsFilterIconPressed] = useState(false)
    const openMenuAnimation = useRef(new Animated.Value(0)).current;


    const setIsFilterIconPressedAnimation = () => {
        if (!isFilterIconPressed){
            open()
        }
        else {
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
        <ReduxProvider store={store}>
            <Header setIsFilterIconPressedAnimation={setIsFilterIconPressedAnimation}
                    isFilterIconPressed={isFilterIconPressed} />
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
        </ReduxProvider>
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
