import {ImageBackground, Pressable, StyleSheet} from "react-native";
import {BORDER_RADIUS, MARGIN} from "../../../constants/style_constants";
import {COLOR_HEADER} from "../../../constants/color_styles";
import {useAppDispatch} from "../../../constants/hooks";
import {changeCurrentItem} from "../../../reducers/home/currentItemReducer";
import {EMPTY_ITEM} from "../../../constants/const_vars";

export default function HighlightedCardInnerImage({imageSource}: HighlightedCardInnerImageProps) {
    const dispatch = useAppDispatch()
    const onCloseHighlightedImage = () => {
        dispatch(changeCurrentItem(EMPTY_ITEM))
    }
    return (
        <Pressable onPress={onCloseHighlightedImage} style={styles.innerImageCard}>
            <ImageBackground style={styles.innerImage}
                             source={{uri: imageSource}}></ImageBackground>
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

export type HighlightedCardInnerImageProps = {
    imageSource: string
}
