import {Pressable, StyleSheet, Text} from "react-native";
import {BORDER_RADIUS, DEFAULT_BUTTON_HEIGHT, MARGIN, PADDING} from "../../../constants/style_constants";
import {COLOR_BACKGROUND} from "../../../constants/color_styles";
import {vh} from "../../../functions/dimentions";
import {useState} from "react";

export default function FilterButton(props: any) {
    const [isTouched, setIsTouched] = useState(false);
    const isClicked = props.state.includes(props.titleENG)
    const onClickHandler = () => {
        props.onClick(props.titleENG)
    }

    return (
        <Pressable onPress={onClickHandler}
                   onTouchStart={() => {setIsTouched(true)}}
                   onTouchEnd={() => {setIsTouched(false)}}
                   style={
            [
                styles.outerButton,
                {
                    backgroundColor: (isClicked || isTouched) ? props.colorActive : props.colorInactive,
                    padding: props?.padding ? props.padding :  PADDING / 8,
                    margin: props?.margin ? props.margin : MARGIN / 2,
                    width: props?.width ? props.width : null,
                },
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
        alignItems: "center",
        justifyContent: "center"
    }
})
