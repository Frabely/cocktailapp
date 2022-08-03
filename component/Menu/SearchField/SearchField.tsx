import {Animated, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, View} from "react-native";
import {COLOR_OPACITY_BACKGROUND, LABEL_BACKGROUND} from "../../../constants/color_styles";
import {vw} from "../../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";

export default function searchField(props: any) {
    const onChangeHandler = (e:  NativeSyntheticEvent<TextInputChangeEventData>) => {
        // @ts-ignore
        props.setCurrentSearchFieldInput(e.currentTarget.value)

    }
    return (
        <Animated.View
            style={
                [styles.searchField, {height: props.openMenuAnimation}]
            }>
            {props.isSearchFieldIconPressed && (
                <View>
                    <TextInput value={props.currentSearchFieldInput} onChange={onChangeHandler} style={styles.testInput} placeholder={'Enter search term'}></TextInput>
                </View>
            )}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    searchField: {
        backgroundColor: COLOR_OPACITY_BACKGROUND,
        width: vw(1),
        // width: '100%',
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        // padding: PADDING,
        // borderBottomLeftRadius: BORDER_RADIUS,
        // borderBottomRightRadius: BORDER_RADIUS,
        justifyContent: "center"
    },
    testInput: {
        padding: PADDING,
        backgroundColor: LABEL_BACKGROUND,
        margin: MARGIN,
        borderRadius: BORDER_RADIUS
    }
})
