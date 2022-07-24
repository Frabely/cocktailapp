import {ImageBackground, StyleSheet, Text, View} from "react-native";

export default function Card(props: any) {
    return (
        // <View style={props.item.idDrink === "13501" ? styles.cardHighlight : styles.cardOuter}>
        <View style={styles.cardOuter}>
                <ImageBackground style={styles.cardInner} source={props.item.strDrinkThumb}>
                    <Text style={styles.letter}>{props.item.strDrink}</Text>
                    <Text style={styles.test}>{props.item.strCategory}</Text>
                </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    cardHighlight: {
        width: '100%',
        height: '90vh',
        padding: 10,
    },
    cardOuter: {
        width: '33.333333%',
        height: '25vh',
        padding: 10,
    },
    cardInner: {
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden'
    },
    letter: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flex:1,
        fontSize:10,
    },
    test: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        fontSize: 7
    }
});
