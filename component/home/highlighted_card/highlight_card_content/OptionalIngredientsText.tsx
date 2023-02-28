import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text, View} from "react-native";
import {BORDER_RADIUS, PADDING} from "../../../../constants/style_constants";
import {COLOR_BACKGROUND, COLOR_OPACITY_VALUE_50} from "../../../../constants/color_styles";
import {Language} from "../../../../constants/types";

export default function OptionalIngredientsText({arrayOptionalIngredientsList}: OptionalIngredientsTextProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language

    return (
        <View style={styles.container}>
            <Text style={styles.headlineText}>
                {language.labels.OPTIONAL_INGREDIENTS_LABEL + "\n"}
            </Text>
            {arrayOptionalIngredientsList.map((item, index) => {
                if (index % 2)
                    return (
                        <Text style={styles.ingredientsText} key={index}>
                            {item}
                        </Text>
                    )
                else
                    return (
                        <Text style={styles.ingredientsTextBackground} key={index}>
                            {item}
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

export type OptionalIngredientsTextProps = {
    arrayOptionalIngredientsList: string[]
}
