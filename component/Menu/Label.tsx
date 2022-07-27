import {StyleSheet, Text, View} from "react-native";
import {BORDER_RADIUS, PADDING} from "../../global_exports/border_margin_padding_defaults";
import {LABEL_BACKGROUND} from "../../global_exports/color_styles";

export default function Label(props: any) {
    return (
        <View style={styles.labelStyle}>
            <Text style={{fontWeight: 'bold'}}>{props.lableName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    labelStyle: {
        padding: PADDING,
        justifyContent: "center",

    }
})
