import {Pressable, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {PADDING} from "../../constants/style_constants";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function HeaderButton({icon, onPress, height, width, color, flex, heightButton, justifyContent}: HeaderButtonProps) {
    return (
        <Pressable onPress={onPress} style={[styles.headerButton, {
            justifyContent: justifyContent ? justifyContent : 'center',
            height: (heightButton || heightButton === 0)  ? heightButton : '100%',
            flex: (flex || flex == 0)  ? flex : 1,
        }]}>
            <FontAwesomeIcon style={{
                width: (width || width === 0) ? width : undefined,
                height: (height || height === 0) ? height : undefined,
                color: color ? color : undefined
            }} icon={icon}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    headerButton: {
        padding: PADDING,
        alignItems: 'center',
    },
})

export type HeaderButtonProps = {
    icon: IconProp,
    onPress: ((...args :any) => any),
    height?: string | number | undefined,
    heightButton?: string | number | undefined,
    width?: string | number | undefined,
    color?: string | undefined,
    flex?: number | undefined,
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined
}
