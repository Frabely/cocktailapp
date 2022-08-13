import {Pressable, StyleSheet, View} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser, faHouse, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {COLOR_HEADER} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {useAppDispatch} from "../../constants/hooks";
import {setHomeScreen, setProfileScreen} from "../../reducers/currentAppScreenReducer";

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
            <Pressable onPress={onBackArrowPressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </Pressable>
            {/*<Pressable onPress={onSearchFieldPressHandler} style={styles.filter}>*/}
            {/*    <FontAwesomeIcon icon={faSearch}/>*/}
            {/*</Pressable>*/}
            {/*<Pressable onPress={onFilterPressHandler} style={styles.filter}>*/}
            {/*    <FontAwesomeIcon icon={faFilter}/>*/}
            {/*</Pressable>*/}

            {/*<View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>*/}
            {/*    /!*<Text>Header Component</Text>*!/*/}
            {/*</View>*/}
            <Pressable onPress={onProfilePressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faUser}/>
            </Pressable>
            <Pressable onPress={onHomePressHandler} style={styles.filter}>
                <FontAwesomeIcon icon={faHouse}/>
            </Pressable>
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
        // TODO change margin Bottom if swapping it to the Top
        marginTop: 0,

        // marginBottom: 0,
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
