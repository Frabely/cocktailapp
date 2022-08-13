import {StyleSheet, View} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {faUser, faHouse, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {COLOR_HEADER} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN} from "../../constants/style_constants";
import {useAppDispatch} from "../../constants/hooks";
import {setHomeScreen, setProfileScreen} from "../../reducers/currentAppScreenReducer";
import HeaderButton from "./HeaderButton";

export default function Header() {
    const dispatch = useAppDispatch()

    const onBackArrowPressHandler = () => {

    }

    const onProfilePressHandler = () => {
        dispatch(setProfileScreen())
    }

    const onHomePressHandler = () => {
        dispatch(setHomeScreen())
    }

    return (
        <View style={styles.header}>
            <HeaderButton onPress={onBackArrowPressHandler} icon={faArrowLeft}/>
            <HeaderButton onPress={onProfilePressHandler} icon={faUser}/>
            <HeaderButton onPress={onHomePressHandler} icon={faHouse}/>
            {/*<View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: vh(0.10)-MARGIN,
        backgroundColor: COLOR_HEADER,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        margin: MARGIN,
        marginTop: 0,

        // marginBottom: 0,
        borderRadius: BORDER_RADIUS/2,
        width: vw(1)-MARGIN*2,
    },
});
