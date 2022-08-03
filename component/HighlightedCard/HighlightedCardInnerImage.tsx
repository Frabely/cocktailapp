import {ImageBackground, Pressable, StyleSheet} from "react-native";
import {BORDER_RADIUS, MARGIN} from "../../constants/style_constants";
import {COLOR_HEADER} from "../../constants/color_styles";

export default function HighlightedCardInnerImage(props: any) {
    const onCloseHighlightedImage = () => {
        props.onImageClickHandler(
            undefined,
            undefined)
    }
    return (
        <Pressable onPress={onCloseHighlightedImage} style={styles.innerImageCard}>
            <ImageBackground style={styles.innerImage}
                             source={{uri: props.imageSource}}></ImageBackground>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    innerImageCard: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        top: 0,
        padding: 4,
        margin: MARGIN,
        border: 0,
        height: '30%',
        width: '50%',
        backgroundColor: COLOR_HEADER,
        borderRadius: 28,
    },
    innerImage: {
        height: '100%',
        width: '100%',
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
    },
})
