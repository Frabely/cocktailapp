import {ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import {vh, vh_reactive} from "../../../functions/dimentions";
import generate_box_shadow_style from "../../../functions/generate_box_shadow_style";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import {COLOR_OPACITY_BACKGROUND} from "../../../constants/color_styles";
import HighlightedCardInnerImage from "./HighlightedCardInnerImage";
import {useAppSelector} from "../../../constants/hooks";
import LikeButton from "./LikeButton";
import HeadlineText from "./highlight_card_content/HeadlineText";
import IngredientsText from "./highlight_card_content/IngredientsText";
import PreparationText from "./highlight_card_content/PreparationText";
import AdditionalCocktailInformation from "./highlight_card_content/AdditionalCocktailInformation";
import GlassTypeText from "./highlight_card_content/GlassTypeText";
import OptionalIngredientsText from "./highlight_card_content/OptionalIngredientsText";
import {Language} from "../../../constants/types";

export default function HighlightedCard({height}: HighlightedCardProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language
    let arrayOptionalIngredients: string[] = language.drinks[`${state.currentItem.idDrink}`].optionalingredients


    generate_box_shadow_style(
        styles,
        -2,
        4,
        '#171717',
        0.2,
        3,
        4,
        '#171717'
    )

    return (
        <View style={[styles.highlightView, {
            height: (height || height == 0) ? height : vh_reactive(0.6, state.dimensions.height) - PADDING * 2
        }]}>
            <ImageBackground style={styles.highlightViewBackgroundImage}
                             source={require(`../../../assets/images/imagesCocktails/${state.currentItem.idDrink}.jpg`)}>
                <HighlightedCardInnerImage
                    imageSource={require(`../../../assets/images/imagesCocktails/${state.currentItem.idDrink}.jpg`)}/>
                <View style={styles.cardHighlightBackground}>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <LikeButton/>
                        </View>
                    </View>
                    <View style={{flex: 5}}>
                        <ScrollView nestedScrollEnabled={true}>
                            <HeadlineText/>
                            <AdditionalCocktailInformation/>
                            <IngredientsText/>
                            {arrayOptionalIngredients && arrayOptionalIngredients.length > 0 ?
                                <OptionalIngredientsText arrayOptionalIngredientsList={arrayOptionalIngredients}/>
                                : null
                            }
                            <PreparationText/>
                            <GlassTypeText/>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1}}></View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    cardHighlightBackground: {
        height: '80%',
        width: '80%',
        padding: PADDING,
        backgroundColor: COLOR_OPACITY_BACKGROUND,
        borderRadius: BORDER_RADIUS,
    },
    highlightViewBackgroundImage: {
        height: '100%',
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
    },
    highlightView: {
        height: vh(0.6) - PADDING * 2,
        width: '100%',
        // TODO if fullscreen remove
        marginBottom: MARGIN
    },
})

export type HighlightedCardProps = {
    height?: string | number
}
