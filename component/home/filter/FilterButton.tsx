import {ColorValue, Pressable, StyleSheet, Text} from "react-native";
import {
    BORDER_RADIUS,
} from "../../../constants/style_constants";
import {COLOR_BACKGROUND} from "../../../constants/color_styles";
import {useState} from "react";

export default function FilterButton({
                                         state, titleENG, onClick, title, colorActive, colorInactive,
                                         padding, width, margin, height, flex
                                     }: FilterButtonProps) {
    const [isTouched, setIsTouched] = useState(false);
    const isClicked = state.includes(titleENG)
    const onClickHandler = () => {
        onClick(titleENG)
    }


    return (
        <Pressable onPress={onClickHandler}
                   onTouchStart={() => {
                       setIsTouched(true)
                   }}
                   onTouchEnd={() => {
                       setIsTouched(false)
                   }}
                   style={[
                       styles.outerButton,
                       {
                           backgroundColor: (isClicked || isTouched) ? colorActive : colorInactive,
                           height: (height || height === 0) ? height : undefined,
                           padding: (padding || padding === 0) ? padding : undefined,
                           margin: (margin || margin === 0) ? margin : undefined,
                           width: (width || width === 0) ? width : undefined,
                           flex: (flex || flex === 0) ? flex : 1,
                       },
                   ]}>
            <Text style={{textAlign: "center"}}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerButton: {
        borderRadius: BORDER_RADIUS / 2,
        backgroundColor: COLOR_BACKGROUND,
        alignItems: "center",
        justifyContent: "center"
    }
})

export type FilterButtonProps = {
    state: string[],
    titleENG: string,
    onClick: ((...args: any) => any),
    title: string,
    colorActive: ColorValue | undefined,
    colorInactive: ColorValue | undefined,
    padding?: number | undefined,
    margin?: number | undefined,
    width?: string | number | null,
    flex?: number | undefined,
    height?: string | number | undefined,
}
