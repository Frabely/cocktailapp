import {StyleSheet, Text, View} from "react-native";
import StyledButton from "./StyledButton";
import {vh, vw} from "../functions/dimentions";
import {LABEL_BACKGROUND} from "../constants/color_styles";
import {BORDER_RADIUS, MARGIN} from "../constants/style_constants";

export default function NoHits(props: any) {
    return (
        <View style={styles.noHits}>
            <View style={styles.noHitsInner}>
                <Text style={{fontWeight: '900'}}>No Hits 😕</Text>
                <StyledButton flex={null} width={'60%'} title={'Reset Filter'} onPress={props.onClearAllFiltersClickHandler}/>
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
