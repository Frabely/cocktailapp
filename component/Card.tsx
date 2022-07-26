import {ImageBackground, Pressable, StyleSheet} from "react-native";
import {vh} from "../functions/dimentions";

export default function Card(props: any) {
    const onImageClickHandler = () => {
        props.onImageClickHandler(
            props.isImageClicked,
            props.item)
    }

    return (
        <Pressable onPress={onImageClickHandler} style={styles.cardOuter}>
            <ImageBackground style={styles.cardInner} source={{uri: props.item.strDrinkThumb}}/>
        </Pressable>
    )
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
        overflow: 'hidden'
    }
});
