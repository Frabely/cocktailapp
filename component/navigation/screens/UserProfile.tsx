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
import {EMPTY_ITEM, EMPTY_USER, FAVORITES, PROFILE_DETAILS, SETTINGS} from "../../../constants/const_vars";
import Header from "../../layout/Header";
import AppBackground from "../../layout/AppBackground";
import {
    FAVORITES_LABEL,
    LOGOUT_LABEL,
    PROFILE_DETAILS_LABEL,
    SETTINGS_LABEL, USER_PROFILE_LABEL
} from "../../../constants/labels";
import LoadingScreen from "../../layout/LoadingScreen";
import {changeCurrentItem} from "../../../reducers/home/currentItemReducer";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../reducers/booleans/isLoadingReducer";
import HeadLine from "../../layout/HeadLine";
import {Cocktail} from "../../../constants/types";

export default function UserProfile({navigation}: any) {
    const state = useAppSelector((state) => state)
    const auth = getAuth(app)
    const dispatch = useAppDispatch()
    const language: string = state.language

    const onProfileDetailsPressHandler = () => {
        navigation.navigate(PROFILE_DETAILS)
    }

    const onSettingsPressHandler = () => {
        navigation.navigate(SETTINGS)
    }

    const onFavoritesPressHandler = () => {
        navigation.navigate(FAVORITES)
    }

    const onLogoutPressHandler = () => {
        dispatch(setIsLoadingTrue())
        if (state.user.userID && state.user.favorites) {
            let favoriteIDArray: string[] = []
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
    }


    return (
        <AppBackground>
            <ScrollView style={[styles.userProfile, {
                height: vh_reactive(0.9, state.dimensions.height)
            }]}>
                <CardLayout>
                    <HeadLine label={USER_PROFILE_LABEL[`${language}`]} margin={MARGIN / 2}/>
                    <UserProfileItem onPress={onProfileDetailsPressHandler} icon={faUserGear}
                                     label={PROFILE_DETAILS_LABEL[`${language}`]}/>
                    <UserProfileItem onPress={onSettingsPressHandler} icon={faGear}
                                     label={SETTINGS_LABEL[`${language}`]}/>
                    <UserProfileItem onPress={onFavoritesPressHandler} icon={faStar}
                                     label={FAVORITES_LABEL[`${language}`]}/>
                    <UserProfileItem onPress={onLogoutPressHandler} icon={faPowerOff}
                                     label={LOGOUT_LABEL[`${language}`]}/>
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
