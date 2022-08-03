import {Pressable, StyleSheet, Text, View} from "react-native";
import {vh} from "../functions/dimentions";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {COLOR_HEADER} from "../constants/color_styles";
import {PADDING} from "../constants/border_margin_padding_defaults";


export default function Header(props: any) {
    const onFilterPressHandler = () => {
        props.setIsHeaderIconPressedAnimation('filter')
    }
    const onSearchFieldPressHandler = () => {
        props.setIsHeaderIconPressedAnimation('searchField')
    }

    return (
        <View style={styles.header}>
            <Pressable onPress={onFilterPressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faFilter} />
            </Pressable>
            <Pressable onPress={onSearchFieldPressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faSearch} />
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
        backgroundColor: COLOR_HEADER,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    filter: {
        height: '100%',
        flex: 1,
        padding: PADDING,
        // backgroundColor: 'rgb(68,50,32)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
