import {Animated, Easing, Image, StyleSheet, View} from "react-native";
import {BORDER_RADIUS} from "../../constants/style_constants";
import {vh} from "../../functions/dimentions";
import {COLOR_BACKGROUND} from "../../constants/color_styles";

export default function LoadingScreen() {
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
                styles.loadingScreenInner,
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
        width: '20%',
        backgroundColor: COLOR_BACKGROUND,
        borderRadius: BORDER_RADIUS,
    }
})
