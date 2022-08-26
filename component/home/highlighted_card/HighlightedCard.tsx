import {ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {vh, vh_reactive, vw_reactive} from "../../../functions/dimentions";
import {useEffect, useState} from "react";
import generate_box_shadow_style from "../../../functions/generate_box_shadow_style";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import {COLOR_HEADER, COLOR_OPACITY_BACKGROUND} from "../../../constants/color_styles";
import HighlightedCardInnerImage from "./HighlightedCardInnerImage";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import HeaderButton from "../../layout/HeaderButton";
import {faStar as faStar_solid} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStar_regular} from "@fortawesome/free-regular-svg-icons";
import {Cocktail} from "../../../constants/types";
import {changeFavorites} from "../../../reducers/user/userReducer";

export default function HighlightedCard({height}: HighlightedCardProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [arrayIngredients, setArrayIngredients] = useState([])

    const setDefaultFavorite = () => {
        if (state.user.favorites && state.currentItem.idDrink) {
            if (state.user.favorites.includes(state.currentItem)) {
                return true
            }
        }
        return false
    }

    const [favorite, setFavorite] = useState(setDefaultFavorite());

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

    useEffect(() => {
        const arrayIngredients: string[] = [];
        const arrayMeasures: string[] = [];
        for (const [key, value] of Object.entries(state.currentItem)) {
            if (key !== null) {
                if (key.startsWith('strIngredient'))
                    if (value !== null)
                        arrayIngredients.push(value)

                if (key.startsWith('strMeasure'))
                    if (value !== null)
                        arrayMeasures.push(value)
                    else
                        arrayMeasures.push('')
            }
        }
        let arrayCombined: any = []
        for (let i = 0; i < arrayIngredients.length && i < arrayMeasures.length; i++) {
            arrayCombined.push({[`${arrayIngredients[i]}`]: arrayMeasures[i]})
        }
        setArrayIngredients(arrayCombined)
    }, [state.currentItem])

    const onFavoritesCLickHandler = () => {
        if (favorite) {
            deleteFavorite()
            setFavorite(false)
        } else {
            addFavorite()
            setFavorite(true)
        }
    }

    const deleteFavorite = () => {
        if (state.user.favorites && state.currentItem.idDrink) {
            const currentFavorites = state.user.favorites.filter((cocktail: Cocktail) => {
                if (cocktail.idDrink !== state.currentItem.idDrink)
                    return cocktail
            })
            dispatch(changeFavorites(currentFavorites))
        }
    }

    const addFavorite = () => {
        if (state.user.favorites && state.currentItem.idDrink) {
            const newFavorites = [...state.user.favorites, state.currentItem]
            dispatch(changeFavorites(newFavorites))
        }
    }

    return (
        <View style={[styles.highlightView, {
            height: (height || height == 0) ? height : vh_reactive(0.6, state.dimensions.height) - PADDING * 2
        }]}>
            <ImageBackground style={styles.highlightViewBackgroundImage}
                             source={{uri: state.currentItem.strDrinkThumb !== null ? state.currentItem.strDrinkThumb : ''}}>
                <HighlightedCardInnerImage
                    imageSource={(state.currentItem.strDrinkThumb) ? state.currentItem.strDrinkThumb : ''}/>
                <View style={styles.cardHighlightBackground}>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <HeaderButton
                                onPress={onFavoritesCLickHandler}
                                size={(state.dimensions.height > state.dimensions.width) ?
                                    vw_reactive(0.1, state.dimensions.width) :
                                    vh_reactive(0.1, state.dimensions.height)}
                                icon={favorite ? faStar_solid : faStar_regular}
                                color={COLOR_HEADER}/>
                        </View>

                    </View>
                    <View style={{flex: 5}}>
                        <ScrollView nestedScrollEnabled={true}>
                            <Text style={{fontSize: 40}}>
                                {state.currentItem.strDrink}
                            </Text>
                            {state.currentItem.strAlcoholic !== null ? (
                                <Text style={{fontSize: 20}}>
                                    {state.currentItem.strAlcoholic}
                                </Text>
                            ) : null
                            }
                            {state.currentItem.strCategory !== null && state.currentItem.strCategory !== "Other/Unknown" ? (
                                <Text style={{fontSize: 20}}>
                                    {state.currentItem.strCategory}
                                </Text>
                            ) : null
                            }
                            <Text style={{fontWeight: 'bold'}}>
                                {state.currentItem.strInstructions}
                            </Text>
                            {state.currentItem.strGlass !== null && state.currentItem.strGlass !== "Other/Unknown" ? (
                                <Text style={{
                                    fontStyle: 'italic',
                                    fontSize: 15
                                }}>
                                    {`Recommended glass type:\n${state.currentItem.strGlass}`}
                                </Text>
                            ) : null
                            }
                            {/*TODO Make better*/}
                            {arrayIngredients.map((item, index) => {
                                return (
                                    <Text key={index}>
                                        - {Object.keys(item)[0]} {item[Object.keys(item)[0]]}
                                    </Text>
                                )
                            })}
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
