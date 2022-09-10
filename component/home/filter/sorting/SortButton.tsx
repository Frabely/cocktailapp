import {StyleSheet, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../../constants/style_constants";
import {COLOR_BACKGROUND} from "../../../../constants/color_styles";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function SortButton({icon, width}: SortButtonProps) {
    return (
        <View style={[styles.sortingButton,
            {
                width: width || width === 0 ? width : undefined
            }]}>
            <FontAwesomeIcon icon={icon}/>
        </View>
    )

}

const styles = StyleSheet.create({
    sortingButton: {
        padding: PADDING,
        backgroundColor: COLOR_BACKGROUND,
        borderRadius: BORDER_RADIUS/2,
        margin: MARGIN
    }
})

export type SortButtonProps = {
    icon: IconProp,
    width?: string | number
}
