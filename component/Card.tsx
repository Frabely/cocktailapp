import {ImageBackground, Platform, Pressable, StyleSheet, View} from "react-native";
import {vh} from "../functions/dimentions";
import generateBoxShadowStyle from '../functions/generateBoxShadowStyle';
// import {BoxShadow} from 'react-native-shadow';


export default function Card(props: any) {
    const onImageClickHandler = () => {
        props.onImageClickHandler(
            props.isImageClicked,
            props.item)
    }
    generateBoxShadowStyle(
        styles,
        -6,
        6,
        '#171717',
        0.4,
        3,
        0,
        '#171717'
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
        height: vh(0.25),
        padding: 10,
    },
    cardInner: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
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

