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
    console.log(props)

    return (
        <Pressable style={[styles.styledButton, {
            backgroundColor: isTouched ? COLOR_HEADER : COLOR_BACKGROUND,
            padding: (props.padding !== undefined) ? props.padding : PADDING / 2,
            margin: (props.margin !== undefined) ? props.margin : MARGIN / 2,
            height: (props.height !== undefined) ? props.height : vh(BUTTON_HEIGHT),
            width: (props.width !== undefined) && props.width,
        }]}
                   onTouchStart={onTouchStartHandler}
                   onTouchEnd={onTouchEndHandler}
                   onPress={props.onPress}>
            <Text style={{textAlign: "center"}}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    styledButton: {
        borderRadius: BORDER_RADIUS / 2,
        backgroundColor: COLOR_BACKGROUND,
        alignItems: "center",
        justifyContent: "center"
    }
})
