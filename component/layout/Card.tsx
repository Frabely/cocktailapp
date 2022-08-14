import {ImageBackground, Pressable, StyleSheet} from "react-native";
import {vh} from "../../functions/dimentions";
import generate_box_shadow_style from '../../functions/generate_box_shadow_style';
import {BORDER_RADIUS, PADDING} from "../../constants/style_constants";
import {COLOR_SHADOW} from "../../constants/color_styles";
import {useAppSelector} from "../../constants/hooks";

export default function Card(props: any) {
    const state = useAppSelector((state) => state)
    const onImageClickHandler = () => {
        props.onImageClickHandler(
            state.currentItem,
            props.item)
    }
    generate_box_shadow_style(
        styles,
        -6,
        6,
        COLOR_SHADOW,
        0.4,
        3,
        0,
        COLOR_SHADOW
    )
    // if (Platform.OS === 'android') {
    //     return (
    //         <Pressable onPress={onImageClickHandler} style={styles.androidCardOuter}>
    //             <View style={[styles.androidCardInner, styles.boxShadow]}>
    //                 <ImageBackground style={styles.androidImageBackground} source={{uri: props.item.strDrinkThumb}}/>
    //             </View>
    //         </Pressable>
    //         // source={{uri: props.item.strDrinkThumb}}
    //     )
    // } else {
        return (
            <Pressable onPress={onImageClickHandler} style={styles.cardOuter}>
                <ImageBackground style={[styles.cardInner, styles.boxShadow]} source={{uri: props.item.strDrinkThumb}}/>
            </Pressable>
        )
    // }
}

const styles = StyleSheet.create({
    cardOuter: {
        flex: 1,
        height: vh(0.20),
        padding: PADDING,
    },
    cardInner: {
        flex: 1,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
    },
    // androidCardInner: {
    //     height: '70%',
    //     width: '70%',
    //     alignItems: "center",
    //     justifyContent: 'center',
    //     borderRadius: 25,
    //     overflow: 'hidden',
    // },
    // androidCardOuter: {
    //     flex: 1,
    //     height: vh(0.25),
    // },
    // androidImageBackground: {
    //     height: '100%',
    //     width: '100%',
    //     backgroundColor: 'white',
    //     borderWidth: 15,
    //     borderRadius: 25,
    //     overflow: 'hidden',
    //     borderColor: 'rgba(0,0,0,0)'
    // },
    boxShadow: {}
});

