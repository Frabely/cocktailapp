import {StyleSheet, View} from "react-native";
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {vh} from "../../functions/dimentions";

export default function UserData() {
    return (
        <View style={styles.userData}>
        </View>
    )
};

const styles = StyleSheet.create({
    userData: {
        backgroundColor: COLOR_BACKGROUND,
        height: vh(0.9),
        width: '100%'
    }
})
