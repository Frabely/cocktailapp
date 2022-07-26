import {Pressable, StyleSheet, Text, View} from "react-native";
import {vh} from "../functions/dimentions";

export default function Header() {
    const onFilterPressHandler = () => {
        alert('filter pressed')
    }

    return (
        <View style={styles.header}>
            <Pressable onPress={onFilterPressHandler} style={styles.filter}>
                <Text>Filter</Text>
            </Pressable>
            <View style={{flex: 5, alignItems: 'center', justifyContent: 'center',}}>
                <Text>Header Component</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: vh(0.10),
        backgroundColor: 'rgb(96,72,45)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    filter: {
        height: '100%',
        flex: 1,
        padding: 10,
        backgroundColor: 'rgb(68,50,32)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
