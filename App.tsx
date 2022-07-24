import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, View} from 'react-native';
import Card from "./component/Card";
import {useState} from "react";
import Header from "./component/Header";
// import dummyData from "./dummyData";
import dummyData from "./dummyData3";


// const data = [
//     {key: 'A'},
//     {key: 'B'},
//     {key: 'C'},
//     {key: 'D'},
//     {key: 'E'},
//     {key: 'F'},
//     {key: 'G'},
//     {key: 'H'}
// ]
// const data = dummyData.drinks;
const data = dummyData.drinks;

export default function App() {

    const [isImageClicked, setIsImageClicked] = useState('');
    // state: any;
    //
    // constructor(props: {}) {
    //     super(props);
    //     this.state = {
    //         isClicked: false
    //     }
    // }
    //
    // setIsClicked = () => {
    //     this.state.isClicked = true
    //     console.log(this.state.isClicked)
    // }


    // getRandomCocktail = async () => {
    //     const response = await fetch('www.thecocktaildb.com/api/json/v1/1/random.php', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/html'
    //         }
    //     });
    //     const body = await response.text()
    //
    //     console.log(body)
    // }

    // render() {
    return (
        <View style={styles.app}>
            <Header></Header>
            <ScrollView>
                <View style={styles.container}>
                    {data.map((item) => {
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
        height: '100vh',
        width: '100%',
        padding: 5
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
