import {StyleSheet, Text, View} from "react-native";
import HeaderButton from "../../layout/HeaderButton";
import {Orientation} from "expo-screen-orientation";
import {vh_reactive, vw_reactive} from "../../../functions/dimentions";
import {faHeart as faStar_solid} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faStar_regular} from "@fortawesome/free-regular-svg-icons";
import {COLOR_HEADER} from "../../../constants/color_styles";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {Cocktail, RatedCocktail, UserIDCocktailIDType} from "../../../constants/types";
import {
    addUserForCurrentCocktail,
    removeUserForCurrentCocktail
} from "../../../reducers/cocktail/cocktailRatingReducer";
import {changeFavorites} from "../../../reducers/user/userReducer";
import {useEffect, useState} from "react";

export default function LikeButton({}: LikeButtonProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const [likes, setLikes] = useState(0);


    const setDefaultFavorite = () => {
        if (state.user.favorites && state.currentItem.idDrink) {
            if (state.user.favorites.includes(state.currentItem)) {
                return true
            }
        }
        return false
    }

    const [favorite, setFavorite] = useState(setDefaultFavorite());

    useEffect(() => {
        let likes = 0
        state.cocktailRating.map((ratedCocktail: RatedCocktail) => {
            if (state.currentItem.idDrink)
                if (ratedCocktail.cocktailID === state.currentItem.idDrink) {
                    likes = ratedCocktail.userIDList.length
                }
        })
        setLikes(likes)
    }, [favorite, state.dataSet, state.cocktailRating])

    const onFavoritesCLickHandler = () => {
        if (state.user.userID && state.currentItem.idDrink) {
            const userIDCockTailID: UserIDCocktailIDType = {
                userID: state.user.userID,
                cocktailID: state.currentItem.idDrink
            }
            if (favorite) {
                deleteFavorite()
                setFavorite(false)
                dispatch(removeUserForCurrentCocktail(userIDCockTailID))
            } else {
                addFavorite()
                setFavorite(true)
                dispatch(addUserForCurrentCocktail(userIDCockTailID))
            }
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
        <>
            <View style={styles.textContainer}>
                <HeaderButton
                    onPress={onFavoritesCLickHandler}
                    size={(state.dimensions.orientationInfo === Orientation.PORTRAIT_UP) ?
                        vw_reactive(0.1, state.dimensions.width) :
                        vh_reactive(0.1, state.dimensions.height)}
                    icon={favorite ? faStar_solid : faStar_regular}
                    color={COLOR_HEADER}
                    flex={1}/>
                <Text style={styles.text}>{likes}</Text>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    text: {
        // padding: PADDING,
        // paddingTop: PADDING*2,
        color: COLOR_HEADER,
        flex: 1
    },
    textContainer: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    }
})

export type LikeButtonProps = {}
