import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text} from "react-native";
import {Language} from "../../../../constants/types";

export default function HeadlineText({}: HeadlineProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language
    return (
        <Text style={styles.text}>
            {language.drinks[`${state.currentItem.idDrink}`].name}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: "bold"
    }
})

export type HeadlineProps = {}
