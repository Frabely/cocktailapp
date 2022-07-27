import {Pressable, StyleSheet, Text, View} from "react-native";
import {vh} from "../functions/dimentions";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";


export default function Header(props: any) {
    const onFilterPressHandler = () => {
        props.setIsFilterIconPressed(!props.isFilterIconPressed)
    }

    return (
        <View style={styles.header}>
            <Pressable onPress={onFilterPressHandler} style={styles.filter}>
                {/*<FontAwesomeIcon icon="filter"></FontAwesomeIcon>*/}
                <FontAwesomeIcon icon={faFilter} />
                {/*<Text>Filter</Text>*/}
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
        // backgroundColor: 'rgb(68,50,32)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
