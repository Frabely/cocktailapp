import {Platform, Pressable, StyleSheet, Text, View} from "react-native";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../constants/color_styles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {useState} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function UserProfileItem({onPress, icon, label}: UserProfileItemProps) {
    const [isTouched, setIsTouched] = useState(false);

    return (
        <Pressable style={[styles.userProfileItem,
            {backgroundColor: isTouched ? COLOR_HEADER : COLOR_BACKGROUND},
            {flex: (Platform.OS === "android") ? undefined : 1}]}
                   onPress={onPress}
                   onTouchStart={() => setIsTouched(true)}
                   onTouchEnd={() => setIsTouched(false)}>
            <View style={styles.icon}>
                <FontAwesomeIcon icon={icon}/>
            </View>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    )

}
const styles = StyleSheet.create({
    userProfileItem: {
        padding: PADDING,
        margin: MARGIN / 2,
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS / 2,
        // width: '80%'
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        paddingLeft: PADDING / 2
    }
})

export type UserProfileItemProps = {
    onPress: ((...args :any) => any),
    icon: IconProp,
    label: string
}
