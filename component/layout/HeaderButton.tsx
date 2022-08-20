import {Pressable, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {PADDING} from "../../constants/style_constants";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function HeaderButton(props: any, {icon, onPress}: HeaderButtonProps) {
    return (
        <Pressable onPress={onPress} style={[styles.headerButton, {
            justifyContent: props?.justifyContent ? props.justifyContent : 'center',
            height: props?.heightButton ? props.heightButton : '100%',
            flex: props?.flex ? props.flex : 1,
        }]}>
            <FontAwesomeIcon style={{
                height: props?.height ? props.height : null,
                width: props?.width ? props.width : null,
                color: props?.color ? props.color : null
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
    onPress: ((...args :any) => any)
}
