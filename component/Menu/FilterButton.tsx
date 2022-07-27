import {Pressable, StyleSheet, Text} from "react-native";
import {BORDER_RADIUS, PADDING} from "../../global_exports/border_margin_padding_defaults";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../global_exports/color_styles";
import {useState} from "react";

export default function FilterButton(props: any) {
    const [isClicked, setIsClicked] = useState(false)

    const onClickHandler = () => {
        setIsClicked(!isClicked)
    }

    return (
        <Pressable onPress={onClickHandler} style={[styles.outerButton, isClicked && {backgroundColor: COLOR_HEADER}]}>
            <Text>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerButton: {
        height: '80%',
        borderRadius: BORDER_RADIUS,
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING,
        alignItems: "center",
        justifyContent: "center"
    }
})
