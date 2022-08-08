import {Animated, ImageBackground, StyleSheet, View} from "react-native";
import {useRef} from "react";
import {vh} from "../functions/dimentions";

export default function LoadingScreen(props: any) {

    const rotateIconAnimation = useRef(new Animated.Value(0)).current;

    const rotate = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(rotateIconAnimation, {
            toValue: 359,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    return (
        <View
            style={[
                styles.loadingScreen,
                {
                    // Bind height to animated value
                    // height: props.openMenuAnimation
                    // transform: [{ scaleX: props.openMenuAnimation }],
                }
            ]}
        >
            {/*<ImageBackground style={{height: '100%', width: '100%'}} source={{uri: "./assets/images/adaptive-icon.png"}}/>*/}

        </View>
    )
}

const styles = StyleSheet.create({
    loadingScreen: {
        height: vh(0.9),
        alignItems: "center",
        justifyContent: "center",
    },
})
