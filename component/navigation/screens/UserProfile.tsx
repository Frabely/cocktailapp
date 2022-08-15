import {StyleSheet, View, Image} from "react-native";
import {COLOR_BACKGROUND, COLOR_CARD_BACKGROUND} from "../../../constants/color_styles";
import {vh} from "../../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import {faGear, faPowerOff, faUserGear} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {activeUser} from "../../../reducers/user/userReducer";
import {app} from "../../../functions/firebase";
import {getAuth} from "firebase/auth";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import CardLayout from "../../layout/CardLayout";
import UserProfileItem from "../../user_profile/UserProfileItem";
import {EMPTY_USER, PROFILE_DETAILS, SETTINGS} from "../../../constants/const_vars";
import Header from "../../layout/Header";
import AppBackground from "../../layout/AppBackground";
import {
    FAVORITES_LABEL,
    IN_DEVELOPMENT_LABEL,
    LOGOUT_LABEL,
    PROFILE_DETAILS_LABEL,
    SETTINGS_LABEL
} from "../../../constants/labels";


export default function UserProfile({navigation}: any) {
    const state = useAppSelector((state) => state)
    const auth = getAuth(app)
    const dispatch = useAppDispatch()
    const language: any = state.language

    const onProfileDetailsPressHandler = () => {
        navigation.navigate(PROFILE_DETAILS)
    }

    const onSettingsPressHandler = () => {
        navigation.navigate(SETTINGS)
    }

    const onFavoritesPressHandler = () => {
        alert(IN_DEVELOPMENT_LABEL[`${language}`])
    }

    const onLogoutPressHandler = () => {
        auth.signOut().then(() => {
            dispatch(activeUser(EMPTY_USER))
        }).catch(error => {
            alert(error.message)
        })
    }
    return (
        <AppBackground>
            <View style={styles.userProfile}>
                <Image style={{position: 'absolute', height: '100%', width: '100%'}}
                       source={require('../../../assets/images/adaptive_background.png')}/>
                <CardLayout>
                    <UserProfileItem onPress={onProfileDetailsPressHandler} icon={faUserGear}
                                     label={PROFILE_DETAILS_LABEL[`${language}`]}/>
                    <UserProfileItem onPress={onSettingsPressHandler} icon={faGear} label={SETTINGS_LABEL[`${language}`]}/>
                    <UserProfileItem onPress={onFavoritesPressHandler} icon={faStar} label={FAVORITES_LABEL[`${language}`]}/>
                    <UserProfileItem onPress={onLogoutPressHandler} icon={faPowerOff} label={LOGOUT_LABEL[`${language}`]}/>
                </CardLayout>
            </View>
            <Header navigation={navigation}/>
        </AppBackground>
    )
};

const styles = StyleSheet.create({
    userProfile: {
        backgroundColor: COLOR_BACKGROUND,
        height: vh(0.9),
        width: '100%'
    },
    cardOuter: {
        flexDirection: 'column',
        backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardInner: {
        backgroundColor: COLOR_BACKGROUND,
        padding: PADDING,
        margin: MARGIN / 2,
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS / 2,
        width: '80%'
        // width: vw(1)-MARGIN-PADDING
    }
})
