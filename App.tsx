import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, View} from 'react-native';
import Card from "./component/Card";
import {Component} from "react";
import Header from "./component/Header";
import dummyData from "./dummyData";

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
const data = dummyData.drinks;


// useEffect(getRandomCocktail, []);

export default class App extends Component {
    getRandomCocktail = async () => {
        const response = await fetch('www.thecocktaildb.com/api/json/v1/1/random.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/html'
            }
        });
        const body = await response.text()

        console.log(body)
    }

    render() {
        return (
            <View style={styles.app}>
                <ScrollView>
                    <Header></Header>
                    {/*<Button title={'Random Cocktail'} onPress={this.getRandomCocktail}></Button>*/}
                    <View style={styles.container}>
                        {data.map((item) => {
                            return (
                                <Card key={item.idDrink} item={item}></Card>
                            )
                        })}
                    </View>
                    <StatusBar style="auto"/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    app: {
        backgroundColor: 'rgba(52,42,17,0.76)',
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
