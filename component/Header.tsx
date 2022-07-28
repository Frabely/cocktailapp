import {Pressable, StyleSheet, Text, View} from "react-native";
import {vh} from "../functions/dimentions";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {COLOR_HEADER} from "../global_exports/color_styles";
import {PADDING} from "../global_exports/border_margin_padding_defaults";


export default function Header(props: any) {
    const onFilterPressHandler = () => {
        props.setIsFilterIconPressedAnimation(props.isFilterIconPressed)
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
