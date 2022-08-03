import {changeAlcoholic} from "../reducers/Filter/alcoholicFilterReducer";
import {ALL} from "../constants/const_vars";
import {changeCategory} from "../reducers/Filter/categoryFilterReducer";
import {StyleSheet, Text, View} from "react-native";
import StyledButton from "./StyledButton";
import {vh, vw} from "../functions/dimentions";
import {LABEL_BACKGROUND} from "../constants/color_styles";
import {BORDER_RADIUS, MARGIN} from "../constants/style_constants";
import {useAppDispatch} from "../constants/hooks";

export default function NoHits(props: any) {
    const dispatch = useAppDispatch()

    const onClearAllFiltersClickHandler = () => {
        dispatch(changeAlcoholic([ALL]))
        dispatch(changeCategory([ALL]))
        props.setCurrentSearchFieldInput('')
    }
    return (
        <View style={styles.noHits}>
            <View style={styles.noHitsInner}>
                <Text style={{fontWeight: '900'}}>No hits 😕</Text>
                <StyledButton title={'Reset filter'} onPress={onClearAllFiltersClickHandler}></StyledButton>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    noHits: {
        height: vh(0.9),
        alignItems: "center",
        justifyContent: "center",
    }, noHitsInner: {
        width: vw(0.5),
        height: vh(0.15),
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN,
        marginTop: MARGIN / 10,
        alignItems: "center",
        justifyContent: "center",
    }
})
