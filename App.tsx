import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import Card from "./component/Card";
import {useEffect, useState} from "react";
import Header from "./component/Header";
import dummyData from "./dummyData3";
import {vh} from "./functions/dimentions";

const data = dummyData.drinks;

export default function App() {
    const [isImageClicked, setIsImageClicked] = useState(undefined)
    const [clickedImagePosition, setClickedImagePosition] = useState(-1)
    const [clickedImageIndex, setClickedImageIndex] = useState(-1)
    const [currentDataSet, setCurrentDataSet] = useState(data)

    // console.log(`${clickedImagePosition} , ${clickedImageIndex}`)

    const repositionClickedImageToStart = (
        array: any,
        clickedImagePosition: number,
        clickedImageIndex: number
    ) => {
        if (clickedImagePosition === 0)
            return array

        if (clickedImagePosition >= 0) {
            let b = array[clickedImageIndex];
            array[clickedImageIndex] = array[clickedImageIndex - clickedImagePosition];
            array[clickedImageIndex - clickedImagePosition] = b;
        }
        setClickedImageIndex(-1)
        setClickedImagePosition(-1)
        return array

    }
    useEffect(() => {
        const newDataSet = repositionClickedImageToStart(currentDataSet, clickedImagePosition, clickedImageIndex);
        setCurrentDataSet(newDataSet)

    }, [isImageClicked])

    const renderItem = ({item, index}: any) => {
        return (
            <Card key={item.idDrink}
                  position={index % 3}
                  setClickedImagePosition={setClickedImagePosition}
                  index={index}
                  setClickedImageIndex={setClickedImageIndex}
                  item={item}
                  isImageClicked={isImageClicked}
                  setIsImageClicked={setIsImageClicked}/>
        )
    }

    return (
        <View style={styles.app}>
            {/*<Header></Header>*/}
            {/*<ScrollView>*/}
            {/*<View style={styles.container}>*/}
            {/*    {currentDataSet.map((item, index) => {*/}
            {/*        return (*/}
            {/*            <Card key={item.idDrink}*/}
            {/*                  position={index % 3}*/}
            {/*                  setClickedImagePosition={setClickedImagePosition}*/}
            {/*                  index={index}*/}
            {/*                  setClickedImageIndex={setClickedImageIndex}*/}
            {/*                  item={item}*/}
            {/*                  isImageClicked={isImageClicked}*/}
            {/*                  setIsImageClicked={setIsImageClicked}>*/}

            {/*            </Card>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</View>*/}
            {/*{isImageClicked && (*/}
            {/*    <Card></Card>*/}
            {/*)}*/}
            <FlatList columnWrapperStyle={styles.row} numColumns={3} data={currentDataSet} renderItem={renderItem}
                      keyExtractor={item => item.idDrink}>
                {/* TODO   https://github.com/AppAndFlow/react-native-masonry-list    */}
            </FlatList>
            {/* TODO or show highlighted here */}
            <StatusBar style="auto"/>
            {/*</ScrollView>*/}
        </View>
    )
    // }
}

const styles = StyleSheet.create({
    app: {
        flexWrap: 'wrap',
        backgroundColor: 'rgb(166,130,91)',
        // height: '100vh',
        height: vh(1),
        width: '100%',
        padding: 5
    },
    row: {
        flex: 1,
        justifyContent: "space-around"
    }
});
