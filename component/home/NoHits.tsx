import {StyleSheet, Text, View} from "react-native";
import StyledButton from "../StyledButton";
import {vh, vw} from "../../functions/dimentions";
import {LABEL_BACKGROUND} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";

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
        height: '50%',
        alignItems: "center",
        justifyContent: "flex-end",
    }, noHitsInner: {
        width: vw(0.5),
        height: vh(0.15),
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        padding: PADDING,
        paddingTop: PADDING / 10,
        alignItems: "center",
        justifyContent: "center",
    }
})
