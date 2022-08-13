import {Pressable, StyleSheet, Text, View} from "react-native";
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";

export default function UserProfileItem(props: any) {
    return (
        <Pressable onPress={props.onPress} style={styles.userProfileItem}>
            <View style={styles.icon}>
                <FontAwesomeIcon icon={props.icon}/>
            </View>
            <Text style={styles.text}>{props.label}</Text>
        </Pressable>
    )

}
const styles = StyleSheet.create({
    userProfileItem: {
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING,
        margin: MARGIN / 2,
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS / 2,
        width: '80%'
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        paddingLeft: PADDING / 2
    }
})
