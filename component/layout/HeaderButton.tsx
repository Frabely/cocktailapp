import {Pressable, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {PADDING} from "../../constants/style_constants";

export default function HeaderButton(props: any) {
    return (
        <Pressable onPress={props.onPress} style={styles.headerButton}>
            <FontAwesomeIcon icon={props.icon}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    headerButton: {
        height: '100%',
        flex: 1,
        padding: PADDING,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
