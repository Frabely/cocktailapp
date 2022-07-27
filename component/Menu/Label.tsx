import {StyleSheet, Text} from "react-native";

export default function Label(props: any) {
    return (
            <Text style={styles.labelStyle}>{props.lableName}</Text>
    )
}

const styles = StyleSheet.create({
    labelStyle: {

    }
})
