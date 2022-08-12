import {StyleSheet, View, Text, Pressable} from "react-native";
import {COLOR_BACKGROUND, COLOR_LABEL_BACKGROUND} from "../../constants/color_styles";
import {vh} from "../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faGear, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {activeUser} from "../../reducers/user/userReducer";
import {app} from "../../functions/firebase";
import {getAuth} from "firebase/auth";
import {useAppDispatch} from "../../constants/hooks";
import {setHomeScreen, setLoginScreen} from "../../reducers/currentAppScreenReducer";


export default function UserProfile() {
    const auth = getAuth(app)
    const dispatch = useAppDispatch()

    const onSettingsPressHandler = () => {
        alert('in development')
    }

    const onFavoritesPressHandler = () => {
        alert('in development')
    }

    const onLogoutPressHandler = () => {
        auth.signOut().then(() => {
            dispatch(setLoginScreen())
            dispatch(activeUser(null))
        }).catch(error => {
            alert(error.message)
        })
    }
    return (
        <View style={styles.userData}>
            <View style={styles.cardOuter}>
                <Pressable onPress={onSettingsPressHandler} style={styles.cardInner}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faGear}/>
                    </View>
                    <Text style={{paddingLeft: PADDING / 2}}>Settings</Text>
                </Pressable>
                <Pressable onPress={onFavoritesPressHandler} style={styles.cardInner}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faStar}/>
                    </View>
                    <Text style={{paddingLeft: PADDING / 2}}>Favorites</Text>
                </Pressable>
                <Pressable onPress={onLogoutPressHandler} style={styles.cardInner}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faPowerOff}/>
                    </View>
                    <Text style={{paddingLeft: PADDING / 2}}>Logout</Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    userData: {
        backgroundColor: COLOR_BACKGROUND,
        height: vh(0.9),
        width: '100%'
    },
    cardOuter: {
        flexDirection: 'column',
        backgroundColor: COLOR_LABEL_BACKGROUND,
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
    }
})
