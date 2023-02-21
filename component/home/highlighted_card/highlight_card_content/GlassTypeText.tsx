import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text} from "react-native";
import {
    GLASS_LABEL
} from "../../../../constants/labels";


export default function GlassTypeText({}: GlassTypeTextProps) {
    const state = useAppSelector((state) => state)
    const language: string = state.language

    return (
        <>
            {state.currentItem.strGlass !== null && state.currentItem.strGlass !== "Other/Unknown" ? (
                <>
                    <Text style={styles.headlineText}>
                        {GLASS_LABEL[`${language}`] + "\n"}
                    </Text>
                    <Text style={styles.contentText}>
                        {state.currentItem.strGlass}
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
