import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {Image, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function AppBackground({children}: AppBackgroundProps) {
    return (
        <View style={styles.appBackground}>
            {/*<StatusBar style="auto"/>*/}
            <Image style={styles.image}
                   source={require('../../assets/images/adaptive_background.png')}/>
            {children}
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

export type AppBackgroundProps = {
    children: any
}

