import {ColorValue, Pressable, StyleSheet, Text, View} from "react-native";
import {BORDER_RADIUS, PADDING} from "../../../constants/style_constants";
import {Dispatch, SetStateAction} from "react";

export default function Switch({setIsLeftActive, isLeftActive, colorSelected, color, leftTitle, rightTitle }: SwitchProps) {
    const onclickHandler = () => {
        setIsLeftActive(!isLeftActive)
    }
    return (
        <View style={{flexDirection: 'row'}}>
            <Pressable onPress={onclickHandler}
                       style={[styles.outerButtonLeft, styles.switchStyle,
                           isLeftActive ? {backgroundColor: colorSelected} : {backgroundColor: color}
                       ]}>
                <Text>{leftTitle}</Text>
            </Pressable>
            <Pressable onPress={onclickHandler}
                       style={[styles.outerButtonRight, styles.switchStyle,
                           isLeftActive ? {backgroundColor: color} : {backgroundColor: colorSelected}
                       ]}>
                <Text>{rightTitle}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    switchStyle: {
        padding: PADDING,
        alignItems: "center",
        justifyContent: "center"
    },
    outerButtonLeft: {
        borderTopLeftRadius: BORDER_RADIUS / 2,
        borderBottomLeftRadius: BORDER_RADIUS / 2,
    },
    outerButtonRight: {
        borderTopRightRadius: BORDER_RADIUS / 2,
        borderBottomRightRadius: BORDER_RADIUS / 2,
    },
})

export type SwitchProps = {
    setIsLeftActive: Dispatch<SetStateAction<boolean>>,
    isLeftActive: boolean,
    colorSelected: ColorValue,
    color: ColorValue,
    leftTitle: string,
    rightTitle: string
}
