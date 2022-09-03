import {ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {vh, vh_reactive} from "../../../functions/dimentions";
import {useEffect, useState} from "react";
import generate_box_shadow_style from "../../../functions/generate_box_shadow_style";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import {COLOR_OPACITY_BACKGROUND} from "../../../constants/color_styles";
import HighlightedCardInnerImage from "./HighlightedCardInnerImage";
import {useAppSelector} from "../../../constants/hooks";
import LikeButton from "./LikeButton";

export default function HighlightedCard({height}: HighlightedCardProps) {
    const state = useAppSelector((state) => state)
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
        const arrayIngredients: string[] = [];
        const arrayMeasures: string[] = [];
        for (const [key, value] of Object.entries(state.currentItem)) {
            if (key !== null) {
                if (key.startsWith('strIngredient'))
                    if (value !== null && typeof value === "string")
                        arrayIngredients.push(value)

                if (key.startsWith('strMeasure'))
                    if (value !== null && typeof value === "string")
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
    }, [state.currentItem])

    return (
        <View style={[styles.highlightView, {
            height: (height || height == 0) ? height : vh_reactive(0.6, state.dimensions.height) - PADDING * 2
        }]}>
            <ImageBackground style={styles.highlightViewBackgroundImage}
                             source={{uri: state.currentItem.strDrinkThumb !== null ? state.currentItem.strDrinkThumb : ''}}>
                <HighlightedCardInnerImage
                    imageSource={(state.currentItem.strDrinkThumb) ? state.currentItem.strDrinkThumb : ''}/>
                <View style={styles.cardHighlightBackground}>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <LikeButton/>
                        </View>

                    </View>
                    <View style={{flex: 5}}>
                        <ScrollView nestedScrollEnabled={true}>
                            <Text style={{fontSize: 40}}>
                                {state.currentItem.strDrink}
                            </Text>
                            {state.currentItem.strAlcoholic !== null ? (
                                <Text style={{fontSize: 20}}>
                                    {state.currentItem.strAlcoholic}
                                </Text>
                            ) : null
                            }
                            {state.currentItem.strCategory !== null && state.currentItem.strCategory !== "Other/Unknown" ? (
                                <Text style={{fontSize: 20}}>
                                    {state.currentItem.strCategory}
                                </Text>
                            ) : null
                            }
                            <Text style={{fontWeight: 'bold'}}>
                                {state.currentItem.strInstructions}
                            </Text>
                            {state.currentItem.strGlass !== null && state.currentItem.strGlass !== "Other/Unknown" ? (
                                <Text style={{
                                    fontStyle: 'italic',
                                    fontSize: 15
                                }}>
                                    {`Recommended glass type:\n${state.currentItem.strGlass}`}
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
        height: vh(0.6) - PADDING * 2,
        width: '100%',
        // TODO if fullscreen remove
        marginBottom: MARGIN
    },
})

export type HighlightedCardProps = {
    height?: string | number
}
