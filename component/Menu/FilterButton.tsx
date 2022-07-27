import {Pressable, StyleSheet, Text} from "react-native";
import {BORDER_RADIUS, PADDING} from "../../global_exports/border_margin_padding_defaults";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../global_exports/color_styles";

export default function FilterButton(props: any) {
    return (
        <Pressable onPress={props.onClick} style={
            [styles.outerButton, {backgroundColor: props.color}]}>
            <Text>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerButton: {
        flex: 1,
        height: '50%',
        borderRadius: BORDER_RADIUS / 2,
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING,
        alignItems: "center",
        justifyContent: "center"
    }
})
