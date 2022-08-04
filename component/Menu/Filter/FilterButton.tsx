import {Pressable, StyleSheet, Text} from "react-native";
import {BORDER_RADIUS, DEFAULT_BUTTON_HEIGHT, MARGIN, PADDING} from "../../../constants/style_constants";
import {COLOR_BACKGROUND} from "../../../constants/color_styles";
import {vh} from "../../../functions/dimentions";

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
        height: vh(DEFAULT_BUTTON_HEIGHT),
        borderRadius: BORDER_RADIUS / 2,
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING / 8,
        margin: MARGIN / 2,
        alignItems: "center",
        justifyContent: "center"
    }
})
