import {Pressable, StyleSheet, Text, View} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFilter, faSearch, faGear, faPowerOff, faUser, faHouse} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {COLOR_HEADER} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {FILTER, HOME, SEARCH_FIELD} from "../../constants/const_vars";
import {app} from "../../functions/firebase";
import {getAuth} from "firebase/auth";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {activeUser} from "../../reducers/user/userReducer";
import {setActiveFilter} from "../../reducers/filter/activeFilterReducer";
import {setHomeScreen, setProfileScreen} from "../../reducers/currentAppScreenReducer";

export default function Header() {
    const auth = getAuth(app)
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const onFilterPressHandler = () => {
        if (state.activeFilter === FILTER) {
            dispatch(setActiveFilter(''))
            return
        }
        dispatch(setActiveFilter(FILTER))
    }
    const onSearchFieldPressHandler = () => {
        if (state.activeFilter === SEARCH_FIELD) {
            dispatch(setActiveFilter(''))
            return
        }
        dispatch(setActiveFilter(SEARCH_FIELD))
    }

    const onProfilePressHandler = () => {
        dispatch(setProfileScreen())
    }

    const onHomePressHandler = () => {
        dispatch(setHomeScreen())
    }

    return (
        <View style={styles.header}>
            <Pressable onPress={onSearchFieldPressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faSearch}/>
            </Pressable>
            <Pressable onPress={onFilterPressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faFilter}/>
            </Pressable>
            {/*<View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>*/}
            {/*    /!*<Text>Header Component</Text>*!/*/}
            {/*</View>*/}
            <Pressable onPress={onProfilePressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faUser}/>
            </Pressable>
            <Pressable onPress={onHomePressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faHouse}/>
            </Pressable>
            {/*<Pressable onPress={onSettingsPressHandler} style={styles.filter}>*/}
            {/*    <FontAwesomeIcon icon={faGear}/>*/}
            {/*</Pressable>*/}
            {/*<Pressable onPress={onLogoutPressHandler} style={styles.filter}>*/}
            {/*    <FontAwesomeIcon icon={faPowerOff}/>*/}
            {/*</Pressable>*/}
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
        // TODO change margin top if swapping it to the bottom
        marginBottom: 0,

        //marginTop: 0,
        borderRadius: BORDER_RADIUS/2,
        width: vw(1)-MARGIN*2,
    },
    filter: {
        height: '100%',
        flex: 1,
        padding: PADDING,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
