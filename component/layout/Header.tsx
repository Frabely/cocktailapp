import {StyleSheet, View} from "react-native";
import {vh, vh_reactive, vw, vw_reactive} from "../../functions/dimentions";
import {faUser, faHouse, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {COLOR_HEADER} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN} from "../../constants/style_constants";
import HeaderButton from "./HeaderButton";
import {ALL, DEFAULT_SORT, EMPTY_ITEM, HOME, PROFILE} from "../../constants/const_vars";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {setActiveFilter} from "../../reducers/filter/activeFilterReducer";
import {changeCurrentItem} from "../../reducers/home/currentItemReducer";
import {setIsLoadingTrue} from "../../reducers/general/booleans/isLoadingReducer";
import {changeAlcoholic} from "../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../reducers/filter/categoryFilterReducer";
import {changeCurrentSearchFieldInput} from "../../reducers/home/currentSearchFieldInputReducer";
import {changeIngredients} from "../../reducers/filter/ingredientsFilterReducer";
import {changeSort} from "../../reducers/filter/sortFilterReducer";

export default function Header({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const onClearAllFiltersClickHandler = () => {
        dispatch(changeAlcoholic([ALL]))
        dispatch(changeCategory([ALL]))
        dispatch(changeCurrentSearchFieldInput(''))
        dispatch(changeIngredients([]))
        dispatch(changeSort([DEFAULT_SORT]))
    }

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
        navigation.navigate(PROFILE)
        dispatch(setActiveFilter(''))
        onClearAllFiltersClickHandler()
    }

    const onHomePressHandler = () => {
        navigation.navigate(HOME)
        dispatch(setActiveFilter(''))
        onClearAllFiltersClickHandler()
        dispatch(setIsLoadingTrue())
    }

    return (
        <View style={[styles.header, {
            width: vw_reactive(1, state.dimensions.width) - MARGIN * 2,
            height: vh_reactive(0.10, state.dimensions.height) - MARGIN
        }]}>
            <HeaderButton onPress={onBackArrowPressHandler} icon={faArrowLeft}/>
            <HeaderButton onPress={onProfilePressHandler} icon={faUser}/>
            <HeaderButton onPress={onHomePressHandler} icon={faHouse}/>
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
