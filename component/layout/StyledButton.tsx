import {Pressable, StyleSheet, Text} from "react-native";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../constants/color_styles";
import {useState} from "react";
import {vh} from "../../functions/dimentions";
import {BORDER_RADIUS, DEFAULT_BUTTON_HEIGHT, MARGIN, PADDING} from "../../constants/style_constants";
import {LabelType} from "../../constants/types";

export default function StyledButton(props: any, {onPress, title}: StyledButtonProps) {
    const [isTouched, setIsTouched] = useState(false)
    const onTouchStartHandler = () => {
        setIsTouched(true)
    }

    const onTouchEndHandler = () => {
        setIsTouched(false)
    }

    return (
        <Pressable style={[styles.styledButton, {
            backgroundColor: isTouched ? COLOR_HEADER : COLOR_BACKGROUND,
            padding: props?.padding  ? props.padding : PADDING / 2,
            margin: props?.margin  ? props.margin : MARGIN / 2,
            height: props?.height ? props.height : vh(DEFAULT_BUTTON_HEIGHT),
            width: props?.width ? props.width : null,
            flex: props?.flex ? props.flex : null
        }]}
                   onTouchStart={onTouchStartHandler}
                   onTouchEnd={onTouchEndHandler}
                   onPress={onPress}>
            <Text style={{textAlign: "center"}}>{title}</Text>
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

export type StyledButtonProps = {
    title: LabelType,
    onPress: (({}: any) => any)
}
