import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {BORDER_RADIUS, PADDING} from "../../../../constants/style_constants";
import {COLOR_BACKGROUND, COLOR_OPACITY_VALUE_50} from "../../../../constants/color_styles";
import {Ingredient, Language} from "../../../../constants/types";

export default function IngredientsText({}: IngredientsTextProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language

    // const [arrayIngredients, setArrayIngredients] = useState([])

    let arrayIngredients: Ingredient[] = []
    let arrayMeasures: number[] = []
    if (state.currentItem.ingredientsList)
        arrayIngredients = state.currentItem.ingredientsList
    if (state.currentItem.liquidMeasuresML)
        arrayMeasures = state.currentItem.liquidMeasuresML;


    // useEffect(() => {
    //     let arrayIngredients: Ingredient[]
    //     if (state.currentItem.ingredientsList)
    //         arrayIngredients = state.currentItem.ingredientsList
    //     let arrayMeasures: number[]
    //     if (state.currentItem.liquidMeasuresML)
    //         arrayMeasures = state.currentItem.liquidMeasuresML;
        // const arrayMeasures: string[] = [];
        // for (const [key, value] of Object.entries(state.currentItem)) {
        //     if (key !== null) {
        //         if (key.startsWith('strIngredient'))
        //             if (value !== null && typeof value === "string")
        //                 arrayIngredients.push(value)
        //
        //         if (key.startsWith('strMeasure'))
        //             if (value !== null && typeof value === "string")
        //                 arrayMeasures.push(value)
        //             else
        //                 arrayMeasures.push('')
        //     }
        // }
        // let arrayCombined: any = []
        // for (let i = 0; i < arrayIngredients.length && i < arrayMeasures.length; i++) {
        //     arrayCombined.push({[`${arrayIngredients[i]}`]: arrayMeasures[i]})
        // }
        // setArrayIngredients(arrayCombined)
    // }, [state.currentItem])


    return (
        <View style={styles.container}>
            <Text style={styles.headlineText}>
                {language.labels.INGREDIENTS_LABEL + "\n"}
            </Text>
            {/*TODO Make better*/}
            {arrayIngredients.map((item, index) => {
                if (index % 2)
                    return (
                        <Text style={styles.ingredientsText} key={index}>
                            {item.name} {arrayMeasures[index]}
                        </Text>
                    )
                else
                    return (
                        <Text style={styles.ingredientsTextBackground} key={index}>
                            {item.name} {arrayMeasures[index]}
                        </Text>
                    )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: PADDING
    },
    headlineText: {
        fontSize: 20
    },
    ingredientsText: {
        fontSize: 13,
        padding: PADDING / 2
    },
    ingredientsTextBackground: {
        fontSize: 13,
        padding: PADDING / 2,
        borderRadius: BORDER_RADIUS / 4,
        backgroundColor: COLOR_BACKGROUND + COLOR_OPACITY_VALUE_50,
    }
})

export type IngredientsTextProps = {}
