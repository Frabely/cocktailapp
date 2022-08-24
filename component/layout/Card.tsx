import {ImageBackground, Pressable, StyleSheet} from "react-native";
import {vh_reactive, vw_reactive} from "../../functions/dimentions";
import generate_box_shadow_style from '../../functions/generate_box_shadow_style';
import {BORDER_RADIUS, PADDING} from "../../constants/style_constants";
import {COLOR_SHADOW} from "../../constants/color_styles";
import {useAppSelector} from "../../constants/hooks";
import {Cocktail} from "../../constants/types";

export default function Card({onPress, item}: CardProps) {
    const state = useAppSelector((state) => state)
    const onImageClickHandler = () => {
        onPress(
            state.currentItem,
            item)
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
            <Pressable onPress={onImageClickHandler} style={[styles.cardOuter,
                (state.dimensions.height > state.dimensions.width) ? {
                height: vh_reactive(0.15, state.dimensions.height),
                maxWidth: vh_reactive(0.15, state.dimensions.height),
            } : {
                height: vw_reactive(0.10, state.dimensions.width),
                maxWidth: vw_reactive(0.10, state.dimensions.width),
            }
            ]}>
                <ImageBackground style={[styles.cardInner, styles.boxShadow]} source={
                    {uri: (item?.strDrinkThumb) ? item.strDrinkThumb : ''}
                }/>
            </Pressable>
        )
    // }
}

const styles = StyleSheet.create({
    cardOuter: {
        flex: 1,
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
    //     height: vh_reactive(0.25),
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

export type CardProps = {
    onPress: ((...args: any) => any),
    item: Cocktail,

}

