import {StyleSheet, Text, View} from "react-native";
import StyledButton from "../layout/StyledButton";
import {vh, vw} from "../../functions/dimentions";
import {BORDER_RADIUS, PADDING} from "../../constants/style_constants";
import CardLayout from "../layout/CardLayout";
import {COLOR_CARD_BACKGROUND} from "../../constants/color_styles";

export default function NoHits(props: any) {
    return (
        <View style={styles.noHits}>
            <CardLayout>
                {/*<View style={styles.noHitsInner}>*/}
                    <Text style={{fontWeight: '900'}}>No Hits 😕</Text>
                    <StyledButton flex={1} title={'Reset Filter'}
                                  onPress={props.onClearAllFiltersClickHandler}/>
                {/*</View>*/}
            </CardLayout>
        </View>
    )
}
const styles = StyleSheet.create({
    noHits: {
        height: '50%',
        alignItems: "center",
        justifyContent: "flex-end",
    },
    noHitsInner: {
        width: vw(0.5),
        height: vh(0.15),
        backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        padding: PADDING,
        paddingTop: PADDING / 10,
        alignItems: "center",
        justifyContent: "center",
    }
})
