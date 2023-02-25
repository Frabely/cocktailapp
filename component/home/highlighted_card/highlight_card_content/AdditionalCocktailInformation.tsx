import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text, View} from "react-native";
import {PADDING} from "../../../../constants/style_constants";
import {Language} from "../../../../constants/types";

export default function AdditionalCocktailInformation({}: AdditionalCocktailInformationProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language
    return (
        <View style={styles.container}>
            {state.currentItem.category !== null && state.currentItem.category !== "Other/Unknown" ? (
                <Text style={styles.contentText}>
                    {state.currentItem.category}
                </Text>
            ) : null
            }
            {state.currentItem.alcoholic ? (
                <Text style={styles.contentText}>
                    {language.labels.ALCOHOLIC_LABEL}
                </Text>
            ) : null
            }
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
    contentText: {
        fontSize: 15
    }
})

export type AdditionalCocktailInformationProps = {}
