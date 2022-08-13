import {ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {vh} from "../../../functions/dimentions";
import {useEffect, useState} from "react";
import generate_box_shadow_style from "../../../functions/generate_box_shadow_style";
import {BORDER_RADIUS, PADDING} from "../../../constants/style_constants";
import {COLOR_OPACITY_BACKGROUND} from "../../../constants/color_styles";
import HighlightedCardInnerImage from "./HighlightedCardInnerImage";

export default function HighlightedCard(props: any) {
    const [arrayIngredients, setArrayIngredients] = useState([])
    generate_box_shadow_style(
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
            <ImageBackground style={[styles.highlightViewBackgroundImage, styles.boxShadow]}
                             source={{uri: props.item.strDrinkThumb}}>
                <HighlightedCardInnerImage
                    imageSource={props.item.strDrinkThumb}
                    onImageClickHandler={props.onImageClickHandler}/>
                <View style={styles.cardHighlightBackground}>
                    <View style={{flex: 3}}></View>
                    <View style={{flex: 5}}>
                        <ScrollView nestedScrollEnabled={true}>
                            <Text style={{fontSize: 40}}>
                                {props.item.strDrink}
                            </Text>
                            {props.item.strAlcoholic !== null ? (
                                <Text style={{fontSize: 20}}>
                                    {props.item.strAlcoholic}
                                </Text>
                            ) : null
                            }
                            {props.item.strCategory !== null && props.item.strCategory !== "Other/Unknown" ? (
                                <Text style={{fontSize: 20}}>
                                    {props.item.strCategory}
                                </Text>
                            ) : null
                            }
                            <Text style={{fontWeight: 'bold'}}>
                                {props.item.strInstructions}
                            </Text>
                            {props.item.strGlass !== null && props.item.strGlass !== "Other/Unknown" ? (
                                <Text style={{
                                    fontStyle: 'italic',
                                    fontSize: 15
                                }}>
                                    {`Recommended glass type:\n${props.item.strGlass}`}
                                </Text>
                                ) : null
                            }
                            {/*TODO Make better*/}
                            {arrayIngredients.map((item, index) => {
                                return (
                                    <Text key={index}>
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
    cardHighlightBackground: {
        height: '80%',
        width: '80%',
        padding: PADDING,
        backgroundColor: COLOR_OPACITY_BACKGROUND,
        borderRadius: BORDER_RADIUS,
    },
    highlightViewBackgroundImage: {
        height: '100%',
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
    },
    highlightView: {
        height: vh(0.6),
        width: '100%',
        padding: PADDING,
    },
    boxShadow: {},
})
