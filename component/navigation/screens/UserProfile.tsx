import {StyleSheet, ScrollView} from "react-native";
import {vh, vh_reactive} from "../../../functions/dimentions";
import {MARGIN} from "../../../constants/style_constants";
import {faGear, faPowerOff, faUserGear} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {activeUser} from "../../../reducers/user/userReducer";
import {app, updateUser} from "../../../functions/firebase";
import {getAuth} from "firebase/auth";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import CardLayout from "../../layout/CardLayout";
import UserProfileItem from "../../user_profile/UserProfileItem";
import {ALL, EMPTY_ITEM, EMPTY_USER, FAVORITES, PROFILE_DETAILS, SETTINGS} from "../../../constants/const_vars";
import Header from "../../layout/Header";
import AppBackground from "../../layout/AppBackground";
import LoadingScreen from "../../layout/LoadingScreen";
import {changeCurrentItem} from "../../../reducers/home/currentItemReducer";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../reducers/general/booleans/isLoadingReducer";
import HeadLine from "../../layout/HeadLine";
import {Cocktail, Language} from "../../../constants/types";
import {changeAlcoholic} from "../../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../../reducers/filter/categoryFilterReducer";
import {changeCurrentSearchFieldInput} from "../../../reducers/home/currentSearchFieldInputReducer";
import {changeIngredients} from "../../../reducers/filter/ingredientsFilterReducer";

export default function UserProfile({navigation}: any) {
    const state = useAppSelector((state) => state)
    const auth = getAuth(app)
    const dispatch = useAppDispatch()
    const language: Language = state.language

    const onClearAllFiltersClickHandler = () => {
        dispatch(changeAlcoholic([ALL]))
        dispatch(changeCategory([ALL]))
        dispatch(changeCurrentSearchFieldInput(''))
        dispatch(changeIngredients([]))
    }

    const onProfileDetailsPressHandler = () => {
        navigation.navigate(PROFILE_DETAILS)
    }

    const onSettingsPressHandler = () => {
        navigation.navigate(SETTINGS)
    }

    const onFavoritesPressHandler = () => {
        navigation.navigate(FAVORITES)
    }

    const onLogoutPressHandler = async () => {
        dispatch(setIsLoadingTrue())
        onClearAllFiltersClickHandler()
        if (state.user.userID && state.user.favorites) {
            // updateRatingLists(state.cocktailRating, state.user.userID).then(() => {
                let favoriteIDArray: string[] = []
                if (state.user.userID && state.user.favorites) {
                    state.user.favorites.map((cocktail: Cocktail) => {
                        if (cocktail.idDrink)
                            favoriteIDArray.push(cocktail.idDrink)
                    })
                    updateUser(state.user.userID, {favorites: favoriteIDArray})
                        .then(() => {
                            auth.signOut().then(() => {
                                dispatch(activeUser(EMPTY_USER))
                                dispatch(changeCurrentItem(EMPTY_ITEM))
                                dispatch(setIsLoadingFalse())
                            }).catch(error => {
                                alert(error.message)
                                dispatch(setIsLoadingFalse())
                            })
                        }).catch(error => {
                        console.log(error.message)
                        dispatch(setIsLoadingFalse())
                    })
                }
            // })
        }
    }


    return (
        <AppBackground>
            <ScrollView style={[styles.userProfile, {
                height: vh_reactive(0.9, state.dimensions.height)
            }]}>
                <CardLayout>
                    <HeadLine label={language.labels.USER_PROFILE_LABEL} margin={MARGIN / 2}/>
                    <UserProfileItem onPress={onProfileDetailsPressHandler} icon={faUserGear}
                                     label={language.labels.PROFILE_DETAILS_LABEL}/>
                    <UserProfileItem onPress={onSettingsPressHandler} icon={faGear}
                                     label={language.labels.SETTINGS_LABEL}/>
                    <UserProfileItem onPress={onFavoritesPressHandler} icon={faStar}
                                     label={language.labels.FAVORITES_LABEL}/>
                    <UserProfileItem onPress={onLogoutPressHandler} icon={faPowerOff}
                                     label={language.labels.LOGOUT_LABEL}/>
                </CardLayout>
            </ScrollView>
            <Header navigation={navigation}/>
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
        </AppBackground>
    )
};

const styles = StyleSheet.create({
    userProfile: {
        height: vh(0.9),
        width: '100%'
    },
})
