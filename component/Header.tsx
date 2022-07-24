import {StyleSheet, Text} from "react-native";

export default function Header() {
    return(
        <Text style={styles.header}>Header Component</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '10%',
        backgroundColor: 'rgba(180, 135, 92, 0.76)',
        display: "flex",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
});
