import {Animated, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, View} from "react-native";
import {COLOR_OPACITY_BACKGROUND, LABEL_BACKGROUND} from "../../../constants/color_styles";
import {vh, vw} from "../../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";

export default function searchField(props: any) {
    const onChangeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        // @ts-ignore
        props.setCurrentSearchFieldInput(e.currentTarget.value)

    }
    return (
        <View style={styles.searchField}>
            <View>
                <TextInput value={props.currentSearchFieldInput} onChange={onChangeHandler}
                           style={styles.testInput} placeholder={'Enter search term'}/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    searchField: {
        width: vw(1),
        position: "absolute",
        left: 0,
        top: 1,
        zIndex: 1,
    },
    testInput: {
        padding: PADDING,
        backgroundColor: LABEL_BACKGROUND,
        margin: MARGIN,
        borderRadius: BORDER_RADIUS
    }
})
