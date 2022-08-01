import {StyleSheet, Text, View} from "react-native";
import {PADDING} from "../../global_exports/border_margin_padding_defaults";

export default function Label(props: any) {
    console.log(props.labelName)
    return (
        <View style={styles.labelStyle}>
            <Text style={{fontWeight: 'bold',}}>{props.labelName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    labelStyle: {
        padding: PADDING,
        // justifyContent: "center",

    }
})
