import {ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {vh} from "../functions/dimentions";

export default function Card(props: any) {
    const isHighlighted = props.item.idDrink === props.isImageClicked
    const [arrayIngredients, setArrayIngredients] = useState([])

    const onImageClickHandler = () => {
        if (isHighlighted) {
            props.setIsImageClicked('')
            return
        }
        props.setIsImageClicked(props.item.idDrink)
    }

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
    }, [])

    return (
        <Pressable onPress={onImageClickHandler}
                   style={isHighlighted ? styles.cardHighlight : styles.cardOuter}>
            <ImageBackground style={styles.cardInner} source={{uri: props.item.strDrinkThumb}}>
                {isHighlighted &&
                    <>
                        <View style={styles.innerImageCard}>
                            <ImageBackground style={styles.innerImage}
                                             source={{uri: props.item.strDrinkThumb}}></ImageBackground>
                        </View>
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
                                    {arrayIngredients.map((item) => {
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
                    </>
                }
            </ImageBackground>
        </Pressable>
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
        width: '100%',
        // height: '90vh',
        height: vh(0.90),
        padding: 10,
    },
    cardOuter: {
        width: '33.333333%',
        // height: '25vh',
        height: vh(0.25),
        padding: 10,
    },
    cardInner: {
        alignItems: "center",
        justifyContent: 'center',
        height: '100%',
        borderRadius: 25,
        overflow: 'hidden'
    }
});
