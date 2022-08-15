import {Pressable, StyleSheet, Text, View} from "react-native";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";

export default function Switch(props: any) {

    const onclickHandler = () => {
        props.setIsLeftActive(!props.isLeftActive)
    }
    return (
        <View style={{flexDirection: 'row'}}>
            <Pressable onPress={onclickHandler}
                       style={[styles.outerButtonLeft, styles.switchStyle,
                           props.isLeftActive ? {backgroundColor: props.colorSelected} : {backgroundColor: props.color}
                       ]}>
                <Text>{props.leftTitle}</Text>
            </Pressable>
            <Pressable onPress={onclickHandler}
                       style={[styles.outerButtonRight, styles.switchStyle,
                           props.isLeftActive ? {backgroundColor: props.color} : {backgroundColor: props.colorSelected}
                       ]}>
                <Text>{props.rightTitle}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    switchStyle: {
        // flex: 1,
        // height: '50%',
        padding: PADDING,
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
