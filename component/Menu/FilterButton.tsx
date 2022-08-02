import {Pressable, StyleSheet, Text} from "react-native";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/border_margin_padding_defaults";
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {vh} from "../../functions/dimentions";

export default function FilterButton(props: any) {

    const onClickHandler = () => {
        props.onClick(props.title)
    }
    const isClicked = props.state.includes(props.title)

    return (
        <Pressable onPress={onClickHandler} style={
            [
                styles.outerButton,
                {backgroundColor: (isClicked) ? props.colorActive : props.colorInactive},
            ]}>
            <Text style={{textAlign: "center"}}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerButton: {
        height: vh(0.06),
        borderRadius: BORDER_RADIUS / 2,
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING / 8,
        margin: MARGIN / 2,
        alignItems: "center",
        justifyContent: "center"
    }
})
