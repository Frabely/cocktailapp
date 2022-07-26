import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, View} from 'react-native';
import Card from "./component/Card";
import {useState} from "react";
import Header from "./component/Header";
import dummyData from "./dummyData3";
import {vh} from "./functions/dimentions";
import HighlightedCard from "./component/HighlightedCard";

const data = dummyData.drinks;

export default function App() {
    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentDataSet, setCurrentDataSet] = useState(data)

    const onImageClickHandler = (
        currentlyClickedItem: any,
        item: any) => {
        if (currentlyClickedItem && currentlyClickedItem.idDrink === item.idDrink) {
            setCurrentItem(undefined)
            return
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
            {/*<Header></Header>*/}
            <View style={styles.app}>
                {currentItem && (
                    <HighlightedCard item={currentItem} onImageClickHandler={onImageClickHandler}/>
                )}
                <FlatList
                    style={styles.flatList}
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
        backgroundColor: 'rgb(166,130,91)',
        // height: vh(0.85),
        height: vh(1),
        width: '100%',
        padding: 10,
    },
    flatList: {
        borderRadius: 25,
        overflow: 'hidden'
    }
});
