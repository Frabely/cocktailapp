import {Pressable, StyleSheet, Text, View} from "react-native";
import {vh} from "../../functions/dimentions";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFilter, faSearch, faGear, faPowerOff, faUser} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {COLOR_HEADER} from "../../constants/color_styles";
import {PADDING} from "../../constants/style_constants";
import {FILTER, SEARCH_FIELD} from "../../constants/const_vars";
import {app} from "../../functions/firebase";
import {getAuth} from "firebase/auth";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {activeUser} from "../../reducers/user/userReducer";
import {setActiveFilter} from "../../reducers/filter/activeFilterReducer";

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

    // const onSettingsPressHandler = () => {
    //     alert("open settings - in development")
    // }

    const onLogoutPressHandler = () => {

        auth.signOut().then(() => {
            dispatch(activeUser(null))
        }).catch(error => {
            alert(error.message)
        })
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
            {/*<Pressable onPress={onSettingsPressHandler} style={styles.filter}>*/}
            {/*    <FontAwesomeIcon icon={faGear}/>*/}
            {/*</Pressable>*/}
            <Pressable onPress={() => {}} style={styles.filter}>
                <FontAwesomeIcon icon={faUser}/>
            </Pressable>
            <Pressable onPress={onLogoutPressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faPowerOff}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: vh(0.10),
        backgroundColor: COLOR_HEADER,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    filter: {
        height: '100%',
        flex: 1,
        padding: PADDING,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
