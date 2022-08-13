import {StyleSheet, View} from "react-native";
import {COLOR_BACKGROUND, COLOR_CARD_BACKGROUND, COLOR_FILTER_BACKGROUND} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";

export default function CardLayout(props: any) {
    return (
        <View style={styles.cardOuter}>{props.children}</View>
    )

}

const styles = StyleSheet.create({
    cardOuter: {
        flexDirection: 'column',
        backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN,
        padding: PADDING,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
