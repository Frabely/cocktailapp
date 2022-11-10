import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text, View} from "react-native";
import {INGREDIENTS_LABEL} from "../../../../constants/labels";
import {useEffect, useState} from "react";
import {PADDING} from "../../../../constants/style_constants";

export default function IngredientsText({}: IngredientsTextProps) {
    const state = useAppSelector((state) => state)
    const language: string = state.language

    const [arrayIngredients, setArrayIngredients] = useState([])

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
        <View style={styles.container}>
            <Text style={styles.headlineText}>
                {INGREDIENTS_LABEL[`${language}`] + "\n"}
            </Text>
            {/*TODO Make better*/}
            {arrayIngredients.map((item, index) => {
                return (
                    <Text style={styles.ingredientsText} key={index}>
                        - {Object.keys(item)[0]} {item[Object.keys(item)[0]]}
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
        fontSize: 13
    }
})

export type IngredientsTextProps = {}
