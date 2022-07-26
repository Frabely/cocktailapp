import {StyleSheet, Text} from "react-native";
import {vh} from "../functions/dimentions";

export default function Header() {
    return(
        <Text style={styles.header}>Header Component</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        height: vh(0.15),
        backgroundColor: 'rgb(96,72,45)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
