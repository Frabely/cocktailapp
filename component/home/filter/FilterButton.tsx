import {ColorValue, Pressable, StyleSheet, Text} from "react-native";
import {BORDER_RADIUS, DEFAULT_BUTTON_HEIGHT, MARGIN, PADDING} from "../../../constants/style_constants";
import {COLOR_BACKGROUND} from "../../../constants/color_styles";
import {vh} from "../../../functions/dimentions";
import {useState} from "react";

export default function FilterButton({state, titleENG, onClick, title, colorActive, colorInactive, padding, width, margin}: FilterButtonProps) {
    const [isTouched, setIsTouched] = useState(false);
    const isClicked = state.includes(titleENG)
    const onClickHandler = () => {
        onClick(titleENG)
    }

    return (
        <Pressable onPress={onClickHandler}
                   onTouchStart={() => {setIsTouched(true)}}
                   onTouchEnd={() => {setIsTouched(false)}}
                   style={
            [
                styles.outerButton,
                {
                    backgroundColor: (isClicked || isTouched) ? colorActive : colorInactive,
                    padding: padding ? padding :  PADDING / 8,
                    margin: margin ? margin : MARGIN / 2,
                    width: width ? width : undefined,
                },
            ]}>
            <Text style={{textAlign: "center"}}>{title}</Text>
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

export type FilterButtonProps = {
    state: string[],
    titleENG : string,
    onClick: (({}: any) => any),
    title: string,
    colorActive: ColorValue | undefined,
    colorInactive: ColorValue | undefined,
    padding?: number | undefined,
    margin?: number | undefined,
    width?: string | number | null
}
