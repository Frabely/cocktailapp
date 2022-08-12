import {StyleSheet, View, Text} from "react-native";
import {COLOR_BACKGROUND, COLOR_LABEL_BACKGROUND} from "../../constants/color_styles";
import {vh} from "../../functions/dimentions";
import Header from "../layout/Header";
import Label from "../home/menu/filter/Label";
import {BORDER_RADIUS, MARGIN} from "../../constants/style_constants";

export default function UserProfile() {
    return (
        <View style={styles.userData}>
            <View style={styles.card}>
                <Text style={{fontSize: 300, textAlign: 'center', textAlignVertical: 'center'}}>😉</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    userData: {
        backgroundColor: COLOR_BACKGROUND,
        height: vh(0.9),
        width: '100%'
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOR_LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
