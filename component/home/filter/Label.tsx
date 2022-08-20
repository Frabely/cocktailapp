import {StyleSheet, Text, View} from "react-native";
import {PADDING} from "../../../constants/style_constants";

export default function Label({labelName}: LabelProps) {
    return (
        <View style={styles.labelStyle}>
            <Text style={{fontWeight: 'bold',}}>{labelName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    labelStyle: {
        padding: PADDING,
        paddingBottom: 0,
        justifyContent: "center",
    }
})

export type LabelProps = {
    labelName: string
}
