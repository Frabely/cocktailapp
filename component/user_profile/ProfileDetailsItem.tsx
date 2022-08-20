import {StyleSheet, Text, View} from "react-native";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {COLOR_BACKGROUND} from "../../constants/color_styles";

export default function ProfileDetailsItem({label, value}: ProfileDetailsItemProps) {
    return (
        <View style={styles.profileDetailsItem}>
            <Text style={{fontWeight: 'bold', flex: 1}}>{label}:</Text>
            <View>
                <Text style={{flex: 1}}>{value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileDetailsItem: {
        flex: 1,
        flexDirection: 'row',
        padding: PADDING,
        margin: MARGIN / 2,
        backgroundColor: COLOR_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2
    }
})

export type ProfileDetailsItemProps = {
    label: string,
    value: string
}

