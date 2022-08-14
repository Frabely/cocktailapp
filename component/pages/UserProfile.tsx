import {StyleSheet, View, Image} from "react-native";
import {COLOR_BACKGROUND, COLOR_CARD_BACKGROUND} from "../../constants/color_styles";
import {vh} from "../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {faGear, faPowerOff, faUserGear} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {activeUser} from "../../reducers/user/userReducer";
import {app} from "../../functions/firebase";
import {getAuth} from "firebase/auth";
import {useAppDispatch} from "../../constants/hooks";
import {setProfileDetailsScreen} from "../../reducers/currentAppScreenReducer";
import CardLayout from "../layout/CardLayout";
import UserProfileItem from "../user_profile/UserProfileItem";
import {PROFILE_DETAILS} from "../../constants/const_vars";
import Header from "../layout/Header";
import AppBackground from "../layout/AppBackground";


export default function UserProfile({navigation}: any) {
    const auth = getAuth(app)
    const dispatch = useAppDispatch()

    const onProfileDetailsPressHandler = () => {
        navigation.navigate(PROFILE_DETAILS)
        dispatch(setProfileDetailsScreen())
    }

    const onSettingsPressHandler = () => {
        alert('in development')
    }

    const onFavoritesPressHandler = () => {
        alert('in development')
    }

    const onLogoutPressHandler = () => {
        auth.signOut().then(() => {
            dispatch(activeUser({username: null, email: null}))
        }).catch(error => {
            alert(error.message)
        })
    }
    return (
        <AppBackground>
            <View style={styles.userProfile}>
                <Image style={{position: 'absolute', height: '100%', width: '100%'}}
                       source={require('../../assets/images/adaptive_background.png')}/>
                <CardLayout>
                    <UserProfileItem onPress={onProfileDetailsPressHandler} icon={faUserGear}
                                     label={'Profile Details'}/>
                    <UserProfileItem onPress={onSettingsPressHandler} icon={faGear} label={'Settings'}/>
                    <UserProfileItem onPress={onFavoritesPressHandler} icon={faStar} label={'Favorites'}/>
                    <UserProfileItem onPress={onLogoutPressHandler} icon={faPowerOff} label={'Logout'}/>
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
