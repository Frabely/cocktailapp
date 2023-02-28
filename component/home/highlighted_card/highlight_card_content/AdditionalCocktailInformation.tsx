import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text, View} from "react-native";
import {PADDING} from "../../../../constants/style_constants";
import {Language} from "../../../../constants/types";

export default function AdditionalCocktailInformation({}: AdditionalCocktailInformationProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language
    return (
        <View style={styles.container}>
            {state.currentItem.category !== null ? (
                <Text style={styles.contentText}>
                    {language.categories[`${state.currentItem.category}`]}
                </Text>
            ) : null
            }
            {state.currentItem.alcoholic === null ? null :
                <Text style={styles.contentText}>
                    {state.currentItem.alcoholic ? language.labels.ALCOHOLIC_LABEL : language.labels.NON_ALCOHOLIC_LABEL}
                </Text>
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
