import {ImageBackground, Pressable, StyleSheet} from "react-native";
import {BORDER_RADIUS, MARGIN} from "../../../constants/style_constants";
import {COLOR_HEADER} from "../../../constants/color_styles";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {changeCurrentItem} from "../../../reducers/home/currentItemReducer";
import {EMPTY_ITEM} from "../../../constants/const_vars";
import {vh_reactive, vw_reactive} from "../../../functions/dimentions";
import {Orientation} from "expo-screen-orientation";
import {updateRatingCocktail} from "../../../functions/databaseUpdate";

export default function HighlightedCardInnerImage({imageSource}: HighlightedCardInnerImageProps) {
    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => state)

    const onCloseHighlightedImage = () => {
        updateRatingCocktail(state).catch(error => console.log(error.message))
        dispatch(changeCurrentItem(EMPTY_ITEM))
    }
    return (
        <Pressable onPress={onCloseHighlightedImage} style={[styles.innerImageCard, {
            height:
                state.dimensions.orientationInfo === Orientation.PORTRAIT_UP ?
                    vw_reactive(0.4, state.dimensions.width) :
                    vh_reactive(0.22, state.dimensions.height),
            width:
                state.dimensions.orientationInfo === Orientation.PORTRAIT_UP ?
                    vw_reactive(0.4, state.dimensions.width) :
                    vh_reactive(0.22, state.dimensions.height)
        }]}>
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
