import {StyleSheet, View} from "react-native";
import {COLOR_CARD_BACKGROUND} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";

export default function CardLayout(props: any) {
    return (
        <View style={[
            styles.cardOuter,
            props?.width ? {width: props.width} : null,
            props?.height ? {height: props.height} : null,
            props?.alignItems ? {alignItems: props.alignItems} : null,
        ]}>{props.children}</View>
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
