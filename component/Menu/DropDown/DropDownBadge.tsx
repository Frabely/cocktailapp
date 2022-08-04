import {StyleSheet, Text, View} from "react-native";
import {vh, vw} from "../../../functions/dimentions";
import {MARGIN, PADDING} from "../../../constants/style_constants";

export default function DropDownBadge(props: any) {
    return (
        <View style={styles.dropDownBadge}>
            <Text style={styles.dropDownBadgeText}>{props.badgeContent}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    dropDownBadge: {
        width: vw(1),
        height: vh(0.05),
        padding: PADDING/2,
        margin: MARGIN/2,
    },
    dropDownBadgeText: {

    }
})
