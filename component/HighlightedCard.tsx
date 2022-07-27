import {ImageBackground, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {vh} from "../functions/dimentions";
import {useEffect, useState} from "react";
import generateBoxShadowStyle from "../functions/generateBoxShadowStyle";

export default function HighlightedCard(props: any) {
    const [arrayIngredients, setArrayIngredients] = useState([])

    const onCloseHighlightedImage = () => {
        props.onImageClickHandler(
            undefined,
            undefined)
    }

    generateBoxShadowStyle(
        styles,
        -2,
        4,
        '#171717',
        0.2,
        3,
        4,
        '#171717'
    )

    useEffect(() => {
        const arrayIngredients: any = [];
        const arrayMeasures: any = [];
        for (const [key, value] of Object.entries(props.item)) {
            if (key !== null) {
                if (key.startsWith('strIngredient'))
                    if (value !== null)
                        arrayIngredients.push(value)

                if (key.startsWith('strMeasure'))
                    if (value !== null)
                        arrayMeasures.push(value)
                    else
                        arrayMeasures.push('')
            }
        }
        let arrayCombined: any = []
        for (let i = 0; i < arrayIngredients.length && i < arrayMeasures.length; i++) {
            arrayCombined.push({[`${arrayIngredients[i]}`]: arrayMeasures[i]})
        }
        setArrayIngredients(arrayCombined)
    }, [props.item])

    return (
        <View style={styles.highlightView}>
            <ImageBackground style={[styles.highlightViewBackgroundImage, styles.boxShadow]} source={{uri: props.item.strDrinkThumb}}>
                <Pressable onPress={onCloseHighlightedImage} style={styles.innerImageCard}>
                    <ImageBackground style={styles.innerImage}
                                     source={{uri: props.item.strDrinkThumb}}></ImageBackground>
                </Pressable>
                <View style={styles.cardHighlightBackground}>
                    <View style={{flex: 3}}></View>
                    <View style={{flex: 5}}>
                        <ScrollView nestedScrollEnabled={true}>
                            <Text style={{fontSize: 40}}>
                                {props.item.strDrink}
                            </Text>
                            {props.item.strAlcoholic !== null &&
                                <Text style={{fontSize: 20}}>
                                    {props.item.strAlcoholic}
                                </Text>
                            }
                            {props.item.strCategory !== null && props.item.strCategory !== "Other/Unknown" &&
                                <Text style={{fontSize: 20}}>
                                    {props.item.strCategory}
                                </Text>
                            }
                            <Text style={{fontWeight: 'bold'}}>
                                {props.item.strInstructions}
                            </Text>
                            {/*TODO Make better*/}
                            {arrayIngredients.map(( item ) => {
                                return (
                                    <Text key={Object.keys(item)[0]}>
                                        - {Object.keys(item)[0]} {item[Object.keys(item)[0]]}
                                    </Text>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style={{flex: 1}}></View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    innerImageCard: {
        position: 'absolute',
        zIndex: 1,
        start: 0,
        top: 0,
        padding: 4,
        margin: 10,
        border: 0,
        height: '30%',
        width: '50%',
        backgroundColor: 'rgb(96,72,45)',
        borderWidth: 1,
        borderRadius: 30,
    },
    innerImage: {
        height: '100%',
        width: '100%',
        borderRadius: 25,
        overflow: 'hidden',
    },
    cardHighlightBackground: {
        height: '80%',
        width: '80%',
        padding: 10,
        backgroundColor: 'rgba(197,197,197,0.6)',
        borderRadius: 25,
    },
    cardHighlight: {
        flex: 3,
        height: vh(0.90),
        padding: 10,
    },
    highlightViewBackgroundImage: {
        height: '100%',
        width: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
        overflow: 'hidden',
    },
    highlightView: {
        height: '70%',
        width: '100%',
        padding: 10,
    },
    boxShadow: {}
})
