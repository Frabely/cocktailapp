import {StyleSheet, View, Text} from "react-native";
import {vh} from "../../functions/dimentions";

export default function Filter(props: any) {
    return (
        <View style={styles.filter}>
            <Text>Filter</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    filter: {
        backgroundColor: 'rgba(197,197,197,0.6)',
        height: vh(0.5),
        width: '100%',
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1
    }
})
