import {StyleSheet, TextInput, View} from "react-native";
import {LABEL_BACKGROUND} from "../../../constants/color_styles";
import {BORDER_RADIUS, PADDING} from "../../../constants/style_constants";

export default function searchField(props: any) {

    return (
        <View style={styles.searchField}>
            <TextInput value={props.currentSearchFieldInput}
                       onChangeText={input => {props.setCurrentSearchFieldInput(input)}}
                       style={styles.testInput} placeholder={'Enter search term'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchField: {
        width: '100%',
    },
    testInput: {
        padding: PADDING,
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2
    },
})
