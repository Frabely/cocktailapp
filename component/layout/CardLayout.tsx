import {FlexAlignType, StyleSheet, View} from "react-native";
import {COLOR_CARD_BACKGROUND} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";

export default function CardLayout({width, height, alignItems, children}: CardLayoutProps) {
    return (
        <View style={[
            styles.cardOuter, {
            width: width ? width : undefined,
            height: height ? height : undefined,
            alignItems: alignItems ? alignItems : undefined,
            }
        ]}>{children}</View>
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

export type CardLayoutProps = {
    width?: string | number | null,
    height?: string | number | null,
    alignItems?: FlexAlignType | null,
    children: any,
}

