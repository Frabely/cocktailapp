import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text, View} from "react-native";
import {PREPARATION_LABEL} from "../../../../constants/labels";
import {PADDING} from "../../../../constants/style_constants";

export default function PreparationText({}: PreparationTextProps) {
    const state = useAppSelector((state) => state)
    const language: string = state.language

    return (
        <View style={styles.container}>
            <Text style={styles.headlineText}>
                {PREPARATION_LABEL[`${language}`] + "\n" }
            </Text>
            <Text style={styles.contentText}>
                {state.currentItem.strInstructions}
            </Text>
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
        fontSize: 13
    }
})

export type PreparationTextProps = {}
