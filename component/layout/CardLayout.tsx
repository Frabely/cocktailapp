import {FlexAlignType, StyleSheet, View} from "react-native";
import {COLOR_CARD_BACKGROUND} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";

export default function CardLayout({width, height, maxHeight, alignItems, children, flexDirection, marginHorizontal, padding, margin}: CardLayoutProps) {
    return (
        <View style={[
            styles.cardOuter, {
                width: (width || width === 0) ? width : undefined,
                height: (height || height === 0) ? height : undefined,
                maxHeight: (maxHeight || maxHeight === 0) ? maxHeight : undefined,
                alignItems: alignItems ? alignItems : undefined,
                marginHorizontal: (marginHorizontal || marginHorizontal === 0) ? marginHorizontal : undefined,
                flexDirection: flexDirection ? flexDirection : 'column',
                padding: padding || padding === 0 ? padding : PADDING,
                margin: margin || margin === 0 ? margin : MARGIN

            }
        ]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    cardOuter: {
        backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        // alignItems: 'center',
        justifyContent: 'center'
    },
})

export type CardLayoutProps = {
    width?: string | number | undefined,
    height?: string | number | undefined,
    maxHeight?: string | number | undefined,
    alignItems?: FlexAlignType | undefined,
    children: any,
    flexDirection?: "column" | "row" | "row-reverse" | "column-reverse" ,
    marginHorizontal?: number,
    padding?: number,
    margin?: number
}

