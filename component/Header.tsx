import {StyleSheet, Text} from "react-native";
import {vh} from "../functions/dimentions";

export default function Header() {
    return(
        <Text style={styles.header}>Header Component</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        height: vh(0.1),
        backgroundColor: 'rgb(96,72,45)',
        display: "flex",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        // overflow: 'hidden'
    },
});
