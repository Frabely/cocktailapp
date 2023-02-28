import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text, View} from "react-native";
import {BORDER_RADIUS, PADDING} from "../../../../constants/style_constants";
import {COLOR_BACKGROUND, COLOR_OPACITY_VALUE_50} from "../../../../constants/color_styles";
import {Ingredient, Language} from "../../../../constants/types";

export default function IngredientsText({}: IngredientsTextProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language

    let arrayIngredients: Ingredient[] = []
    let arrayMeasures: number[] = []
    if (state.currentItem.ingredientsList)
        arrayIngredients = state.currentItem.ingredientsList
    if (state.currentItem.liquidMeasuresML)
        arrayMeasures = state.currentItem.liquidMeasuresML;

    return (
        <View style={styles.container}>
            <Text style={styles.headlineText}>
                {language.labels.INGREDIENTS_LABEL + "\n"}
            </Text>
            {arrayIngredients.map((item, index) => {
                if (index % 2)
                    return (
                        <Text style={styles.ingredientsText} key={index}>
                            {arrayMeasures[index]} {state.user.unitOfMeasureForLiquidsSetting} {language.ingredients[`${item.idIngredient}`].name}
                        </Text>
                    )
                else
                    return (
                        <Text style={styles.ingredientsTextBackground} key={index}>
                            {arrayMeasures[index]} {state.user.unitOfMeasureForLiquidsSetting} {language.ingredients[`${item.idIngredient}`].name}
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
