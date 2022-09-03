import {StyleSheet, View} from "react-native";
import {vh, vh_reactive, vw, vw_reactive} from "../../functions/dimentions";
import {BORDER_RADIUS, MARGIN} from "../../constants/style_constants";
import {COLOR_HEADER} from "../../constants/color_styles";
import HeaderButton from "../layout/HeaderButton";
import {
    faFilter,
    faSort,
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import {FILTER, SEARCH_FIELD} from "../../constants/const_vars";
import {setActiveFilter} from "../../reducers/filter/activeFilterReducer";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {IN_DEVELOPMENT_LABEL} from "../../constants/labels";

export default function HeaderHome() {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: string = state.language

    const onSearchPressHandler = () => {
        if (state.activeFilter === SEARCH_FIELD) {
            dispatch(setActiveFilter(''))
            return
        }
        dispatch(setActiveFilter(SEARCH_FIELD))
    }

    const onSortPressHandler = () => {
      alert(IN_DEVELOPMENT_LABEL[`${language}`])
    }

    const onFilterPressHandler = () => {
        if (state.activeFilter === FILTER) {
            dispatch(setActiveFilter(''))
            return
        }
        dispatch(setActiveFilter(FILTER))
    }

    return (
        <View style={[styles.headerHome, {
            width: vw_reactive(1, state.dimensions.width)-MARGIN*2,
            height: vh_reactive(0.10, state.dimensions.height)-MARGIN
        }]}>
            <HeaderButton onPress={onSearchPressHandler} icon={faSearch}/>
            <HeaderButton onPress={onSortPressHandler} icon={faSort}/>
            <HeaderButton onPress={onFilterPressHandler} icon={faFilter}/>
        </View>
    )
}

const styles = StyleSheet.create({
    headerHome: {
        height: vh(0.10)-MARGIN,
        backgroundColor: COLOR_HEADER,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        margin: MARGIN,
        marginBottom: 0,

        // marginTop: 0,
        borderRadius: BORDER_RADIUS/2,
        width: vw(1)-MARGIN*2,
    },
})
