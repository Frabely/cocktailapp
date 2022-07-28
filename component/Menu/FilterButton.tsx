import {Pressable, StyleSheet, Text} from "react-native";
import {BORDER_RADIUS, PADDING} from "../../global_exports/border_margin_padding_defaults";
import {COLOR_BACKGROUND} from "../../global_exports/color_styles";

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
            <Text>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerButton: {
        borderRadius: BORDER_RADIUS / 2,
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING,
        margin: 5,
        alignItems: "center",
        justifyContent: "center"
    }
})
