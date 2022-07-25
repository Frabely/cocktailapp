import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, View} from 'react-native';
import Card from "./component/Card";
import {useState} from "react";
import Header from "./component/Header";
import dummyData from "./dummyData3";
import {vh} from "./functions/dimentions";

const data = dummyData.drinks;

export default function App() {
    const [isImageClicked, setIsImageClicked] = useState('');

    return (
        <View style={styles.app}>
            {/*<Header></Header>*/}
            <ScrollView>
                <View style={styles.container}>
                    {data.map((item ) => {
                        return (
                            <Card key={item.idDrink} item={item} isImageClicked={isImageClicked}
                                  setIsImageClicked={setIsImageClicked}></Card>
                        )
                    })}
                </View>
                <StatusBar style="auto"/>
            </ScrollView>
        </View>
    )
    // }
}

const styles = StyleSheet.create({
    app: {
        backgroundColor: 'rgb(166,130,91)',
        // height: '100vh',
        height: vh(1),
        width: '100%',
        padding: 5
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
