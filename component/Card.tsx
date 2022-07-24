import {ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";

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
                if (value !== null) {
                    if (key.startsWith('strIngredient')) {
                        arrayIngredients.push(value)
                    }
                    if (key.startsWith('strMeasure')) {
                        arrayMeasures.push(value)
                    }
                }
            }
            let arrayCombined: any = []
            for (let i=0; i<arrayIngredients.length && i<arrayMeasures.length; i++) {
                arrayCombined.push({[`${arrayIngredients[i]}`]: arrayMeasures[i]})
            }
            // console.log(arrayCombined)
            setArrayIngredients(arrayCombined)
        }
        , [])

    return (
        <View onTouchStart={onImageClickHandler}
              style={isHighlighted ? styles.cardHighlight : styles.cardOuter}>
            <ImageBackground style={styles.cardInner} source={props.item.strDrinkThumb}>
                {isHighlighted &&
                    <>
                        <View style={styles.innerImageCard}>
                            <ImageBackground style={styles.innerImage}
                                             source={props.item.strDrinkThumb}></ImageBackground>
                        </View>
                        <View style={styles.cardHighlightBackground}>
                            <View style={{flex: 3}}></View>
                            <ScrollView style={{flex: 5}}>
                                <Text style={{fontSize: 40}}>
                                    {props.item.strDrink}
                                </Text>
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
                            <View style={{flex: 1}}></View>
                        </View>
                    </>
                }
                {/*{!isHighlighted &&*/}
                {/*    <>*/}
                {/*        <Text style={styles.letter}>{props.item.strDrink}</Text>*/}
                {/*        <Text style={styles.test}>{props.item.strCategory}</Text>*/}
                {/*    </>*/}
                {/*}*/}
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
        alignItems: "center",
        justifyContent: 'center',
        height: '100%',
        borderRadius: 25,
        overflow: 'hidden'
    },
    letter: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        fontSize: 10,
    },
    test: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        fontSize: 7
    }
});
