import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text, View} from "react-native";
import {PADDING} from "../../../../constants/style_constants";

export default function AdditionalCocktailInformation({}: AdditionalCocktailInformationProps) {
    const state = useAppSelector((state) => state)
    return (
        <View style={styles.container}>
            {state.currentItem.strCategory !== null && state.currentItem.strCategory !== "Other/Unknown" ? (
                <Text style={styles.contentText}>
                    {state.currentItem.strCategory}
                </Text>
            ) : null
            }
            {state.currentItem.strAlcoholic !== null ? (
                <Text style={styles.contentText}>
                    {state.currentItem.strAlcoholic}
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
