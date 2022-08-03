import {Pressable, StyleSheet, Text} from "react-native";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../constants/color_styles";
import {useState} from "react";
import {vh} from "../functions/dimentions";
import {BORDER_RADIUS, BUTTON_HEIGHT, MARGIN, PADDING} from "../constants/style_constants";

export default function StyledButton(props: any) {
    const [isTouched, setIsTouched] = useState(false)
    const onTouchStartHandler = () => {
        setIsTouched(true)
    }

    const onTouchEndHandler = () => {
        setIsTouched(false)
    }

    return (
        <Pressable style={[styles.styledButton, {backgroundColor: isTouched ? COLOR_HEADER : COLOR_BACKGROUND}]}
                   onTouchStart={onTouchStartHandler}
                   onTouchEnd={onTouchEndHandler}
                   onPress={props.onPress}>
            <Text style={{textAlign: "center"}}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    styledButton: {
        height: vh(BUTTON_HEIGHT),
        borderRadius: BORDER_RADIUS / 2,
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING/2,
        margin: MARGIN/2,
        alignItems: "center",
        justifyContent: "center"
    }
})
