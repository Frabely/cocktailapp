import {StyleSheet, Text} from "react-native";

export default function Header() {
    return(
        <Text style={styles.header}>Header Component</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '100vh',
        // TODO head size
        backgroundColor: 'rgb(96,72,45)',
        display: "flex",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
});
