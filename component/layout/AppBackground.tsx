import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {Image, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function AppBackground(props: any) {
    return (
        <View style={styles.appBackground}>
            {/*<StatusBar style="auto"/>*/}
            <Image style={styles.image}
                   source={require('../../assets/images/adaptive_background.png')}/>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    appBackground: {
        backgroundColor: COLOR_BACKGROUND
    },
    image: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    }
})
