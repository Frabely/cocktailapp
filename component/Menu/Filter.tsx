import {StyleSheet, View, Text} from "react-native";
import {vh} from "../../functions/dimentions";
import {COLOR_OPACITY_BACKGROUND} from "../../global_exports/color_styles";

export default function Filter(props: any) {
    return (
        <View style={styles.filter}>
            <Text>Filter</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    filter: {
        backgroundColor: COLOR_OPACITY_BACKGROUND,
        height: vh(0.5),
        width: '100%',
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1
    }
})
