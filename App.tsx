import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, View} from 'react-native';
import Card from "./component/Card";
import {useState} from "react";
import Header from "./component/Header";
import dummyData from "./dummyData3";
import {vh} from "./functions/dimentions";
import HighlightedCard from "./component/HighlightedCard";
import Filter from "./component/Menu/Filter";
import {COLOR_BACKGROUND} from "./global_exports/color_styles";
import {PADDING} from "./global_exports/border_margin_padding_defaults";

const data = dummyData.drinks;

export default function App() {
    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentDataSet, setCurrentDataSet] = useState(data)
    const [isFilterIconPressed, setIsFilterIconPressed] = useState(false)

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
            <Header setIsFilterIconPressed={setIsFilterIconPressed}
                    isFilterIconPressed={isFilterIconPressed}>

            </Header>
            <View style={styles.app}>
                {isFilterIconPressed && (
                    <Filter></Filter>
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
