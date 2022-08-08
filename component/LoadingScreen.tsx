import {Animated, ImageBackground, StyleSheet} from "react-native";
import {useRef} from "react";

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
        <Animated.View
            style={[
                styles.loadingScreen,
                {
                    // Bind height to animated value
                    height: props.openMenuAnimation
                    // transform: [{ scaleX: props.openMenuAnimation }],
                }
            ]}
        >
            <ImageBackground source={}/>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    loadingScreen: {
        height: '50%',
        alignItems: "center",
        justifyContent: "flex-end",
    },
})
