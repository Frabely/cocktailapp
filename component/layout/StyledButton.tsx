import {Platform, Pressable, StyleSheet, Text} from "react-native";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../constants/color_styles";
import {useState} from "react";
import {
    BORDER_RADIUS,
} from "../../constants/style_constants";

export default function StyledButton({onPress, title, margin, padding, width, flex, height}: StyledButtonProps) {
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
            height: (height || height === 0) ? height : undefined,
            padding: (padding || padding === 0) ? padding : undefined,
            margin: (margin || margin === 0) ? margin : undefined,
            width: (width || width === 0) ? width : undefined,
            flex: (flex || flex === 0) ? flex : (Platform.OS === "android") ? undefined : 1
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
    title: string,
    onPress: ((...args: any) => any),
    padding?: number | undefined,
    margin?: number | undefined,
    width?: string | number | undefined,
    height?: string | number | undefined,
    flex?: number | undefined
}
