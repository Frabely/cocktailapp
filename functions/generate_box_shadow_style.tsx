import {ColorValue, Platform} from "react-native";

export const generate_box_shadow_style = (
    styles: any,
    xOffset: number,
    yOffset: number,
    shadowColorIos: ColorValue,
    shadowOpacity: number,
    shadowRadius: number,
    elevation: number,
    shadowColorAndroid: ColorValue,
) => {
    if (Platform.OS === 'ios' || Platform.OS == 'web') {
        styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: {width: xOffset, height: yOffset},
            shadowOpacity,
            shadowRadius,
        };
    //    TODO not really working -> looks ugly too
    } else if (Platform.OS === 'android') {
        styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
        };
    }
};
export default generate_box_shadow_style
