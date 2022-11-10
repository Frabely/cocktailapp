import {useAppSelector} from "../../../../constants/hooks";
import {StyleSheet, Text} from "react-native";

export default function HeadlineText({}: HeadlineProps) {
    const state = useAppSelector((state) => state)
    return (
        <Text style={styles.text}>
            {state.currentItem.strDrink}
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
