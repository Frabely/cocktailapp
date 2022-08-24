import {Animated, Easing, Image, StyleSheet, View} from "react-native";
import {BORDER_RADIUS} from "../../constants/style_constants";
import {vh, vh_reactive, vw, vw_reactive} from "../../functions/dimentions";
import {COLOR_CARD_BACKGROUND} from "../../constants/color_styles";
import {useAppSelector} from "../../constants/hooks";

export default function LoadingScreen() {
    const state = useAppSelector((state) => state)
    let spinValue  = new Animated.Value(0)

    const rotate = () => {
        // Turning while this screen is active
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => {
            spinValue.setValue(0)
            rotate()
        });
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    rotate()

    return (
        <View style={styles.loadingScreenOuter}>
            <Animated.View style={[
                styles.loadingScreenInner, {
                    width: vw_reactive(0.2, state.dimensions.width),
                    height: vh_reactive(0.1, state.dimensions.height),
                    maxWidth: vh_reactive(0.1, state.dimensions.height)
                },
            {
                transform: [{rotate: spin}]
            }
                ]}>
                <Image style={{height: '100%', width: '100%'}}
                       source={require('../../assets/images/adaptive-icon.png')}/>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingScreenOuter: {
        height: '100%',
        width: '100%',
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    loadingScreenInner: {
        height: vh(0.1),
        width: vw(0.2),
        maxWidth: vh(0.1),
        backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS,
    }
})
