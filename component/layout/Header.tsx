import {StyleSheet, View} from "react-native";
import {vh, vh_reactive, vw, vw_reactive} from "../../functions/dimentions";
import {faUser, faHouse, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {COLOR_HEADER} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN} from "../../constants/style_constants";
import HeaderButton from "./HeaderButton";
import {ALL, EMPTY_ITEM, HOME, PROFILE} from "../../constants/const_vars";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {setActiveFilter} from "../../reducers/filter/activeFilterReducer";
import {changeCurrentItem} from "../../reducers/home/currentItemReducer";
import {changeCurrentDataSet} from "../../reducers/home/currentDataSetReducer";
import {changeCategory} from "../../reducers/filter/categoryFilterReducer";
import {changeAlcoholic} from "../../reducers/filter/alcoholicFilterReducer";
import {changeCurrentSearchFieldInput} from "../../reducers/home/currentSearchFieldInputReducer";
import {changeIngredients} from "../../reducers/filter/ingredientsFilterReducer";
import {fetchFullDataSetAsArray} from "../../functions/firebase";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../reducers/booleans/isLoadingReducer";

export default function Header({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const onBackArrowPressHandler = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        if (state.activeFilter !== '') {
            dispatch(setActiveFilter(''))
        }
        if (state.currentItem.idDrink) {
            dispatch(changeCurrentItem(EMPTY_ITEM))
        }
    }

    const onProfilePressHandler = () => {
        dispatch(changeCurrentDataSet([]))
        navigation.navigate(PROFILE)
    }

    const onHomePressHandler = () => {
        navigation.navigate(HOME)
        dispatch(setActiveFilter(''))
        dispatch(changeAlcoholic([ALL]))
        dispatch(changeCategory([ALL]))
        dispatch(changeIngredients([]))
        dispatch(changeCurrentSearchFieldInput(''))
        dispatch(setIsLoadingTrue())
        fetchFullDataSetAsArray().then(resultData => {
            if (resultData) {
                dispatch(changeCurrentDataSet(resultData))
                dispatch(setIsLoadingFalse())
            } else {
                dispatch(changeCurrentDataSet([]))
                dispatch(setIsLoadingFalse())
            }
        }).catch(error => {
            console.log(error.message)
            dispatch(setIsLoadingFalse())
        })

    }

    return (
        <View style={[styles.header, {
            width: vw_reactive(1, state.dimensions.width) - MARGIN * 2,
            height: vh_reactive(0.10, state.dimensions.height) - MARGIN
        }]}>
            <HeaderButton onPress={onBackArrowPressHandler} icon={faArrowLeft}/>
            <HeaderButton onPress={onProfilePressHandler} icon={faUser}/>
            <HeaderButton onPress={onHomePressHandler} icon={faHouse}/>
            {/*<View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: vh(0.10) - MARGIN,
        backgroundColor: COLOR_HEADER,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        margin: MARGIN,
        marginTop: 0,

        // marginBottom: 0,
        borderRadius: BORDER_RADIUS / 2,
        width: vw(1) - MARGIN * 2,
    },
});
