import {Pressable, StyleSheet, Text} from "react-native";
import {BORDER_RADIUS, PADDING} from "../../global_exports/border_margin_padding_defaults";
import {COLOR_BACKGROUND} from "../../global_exports/color_styles";
import {vh} from "../../functions/dimentions";

export default function FilterButton(props: any) {
    const onClickHandler = () => {
        props.onClick(props.title)
    }

    return (
        <Pressable onPress={onClickHandler} style={
            [
                styles.outerButton,
                {backgroundColor: (props.currentFilter===props.title) ? props.colorActive : props.colorInactive},
            ]}>
            <Text style={{textAlign: "center",}}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerButton: {
        height: vh(0.05),
        borderRadius: BORDER_RADIUS / 2,
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING,
        margin: 5,
        alignItems: "center",
        justifyContent: "center"
    }
})
