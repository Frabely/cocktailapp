import {Pressable, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {PADDING} from "../../constants/style_constants";

export default function HeaderButton(props: any) {
    return (
        <Pressable onPress={props.onPress} style={[styles.headerButton, {
            justifyContent: props?.justifyContent ? props.justifyContent : 'center',
            height: props?.heightButton ? props.heightButton : '100%',
            flex: props?.flex ? props.flex : 1,
        }]}>
            <FontAwesomeIcon style={{
                height: props?.height ? props.height : null,
                width: props?.width ? props.width : null,
                color: props?.color ? props.color : null
            }} icon={props.icon}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    headerButton: {
        padding: PADDING,
        alignItems: 'center',
    },
})
