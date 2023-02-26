import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text} from "react-native";
import {Language} from "../../../../constants/types";


export default function GlassTypeText({}: GlassTypeTextProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language

    return (
        <>
            {state.currentItem.glass !== null && state.currentItem.glass !== "Other/Unknown" ? (
                <>
                    <Text style={styles.headlineText}>
                        {language.labels.GLASS_LABEL + "\n"}
                    </Text>
                    <Text style={styles.contentText}>
                        {language.drinks[`${state.currentItem.idDrink}`].glass}
                    </Text>
                </>
            ) : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    headlineText: {
        fontSize: 20
    },
    contentText: {
        fontSize: 15
    }
})

export type GlassTypeTextProps = {}
