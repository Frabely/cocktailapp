import {StyleSheet, TextInput, View} from "react-native";
import {COLOR_CARD_BACKGROUND} from "../../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import {ENTER_SEARCH_TERM_LABEL} from "../../../constants/labels";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {changeCurrentSearchFieldInput} from "../../../reducers/home/currentSearchFieldInputReducer";

export default function searchField() {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: any = state.language

    return (
        <View style={styles.searchField}>
            <TextInput value={state.currentSearchFieldInput}
                       onChangeText={input => {dispatch(changeCurrentSearchFieldInput(input))}}
                       style={styles.testInput} placeholder={ENTER_SEARCH_TERM_LABEL[`${language}`]}
                       selectTextOnFocus={true}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchField: {
        width: '100%',
        marginBottom: MARGIN/2
    },
    testInput: {
        padding: PADDING,
        backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2
    },
})
