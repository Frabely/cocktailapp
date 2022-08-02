import {Pressable, StyleSheet, Text, View} from "react-native";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/border_margin_padding_defaults";
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {useState} from "react";

export default function Switch(props: any) {
    const [isLeftActive, setIsLeftActive] = useState(true)

    const onclickHandler = () => {
        setIsLeftActive(!isLeftActive)
    }
    return (
        <View style={{flexDirection: 'row'}}>
            <Pressable onPress={onclickHandler}
                       style={[styles.outerButtonLeft, styles.switchStyle,
                           isLeftActive ? {backgroundColor: props.colorSelected} : {backgroundColor: props.color}
                       ]}>
                <Text>{props.leftTitle}</Text>
            </Pressable>
            <Pressable onPress={onclickHandler}
                       style={[styles.outerButtonRight, styles.switchStyle,
                           isLeftActive ? {backgroundColor: props.color} : {backgroundColor: props.colorSelected}
                       ]}>
                <Text>{props.rightTitle}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    switchStyle: {
        flex: 1,
        height: '50%',
        padding: PADDING / 2,
        alignItems: "center",
        justifyContent: "center"
    },
    outerButtonLeft: {
        borderTopLeftRadius: BORDER_RADIUS / 2,
        borderBottomLeftRadius: BORDER_RADIUS / 2,
        marginLeft: MARGIN / 2,
    },
    outerButtonRight: {
        borderTopRightRadius: BORDER_RADIUS / 2,
        borderBottomRightRadius: BORDER_RADIUS / 2,
        marginRight: MARGIN / 2,
    },


})
