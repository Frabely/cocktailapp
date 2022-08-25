import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {Image, StyleSheet, View} from "react-native";
import {vh_reactive, vw_reactive} from "../../functions/dimentions";
import {useAppSelector} from "../../constants/hooks";

export default function AppBackground({children}: AppBackgroundProps) {
    const state = useAppSelector((state) => state)
    return (
        <View style={[styles.appBackground,
            {
                height: vh_reactive(1, state.dimensions.height),
                width: vw_reactive(1, state.dimensions.width),
            }]}>
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
        width: '100%',
    }
})

export type AppBackgroundProps = {
    children: any
}

