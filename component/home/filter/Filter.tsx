import {StyleSheet, View} from "react-native";
import {vw} from "../../../functions/dimentions";
import {COLOR_CARD_BACKGROUND} from "../../../constants/color_styles";
import {BORDER_RADIUS, MARGIN} from "../../../constants/style_constants";
import FilterPanel from "./FilterPanel";
import {ALL} from "../../../constants/const_vars";
import {CATEGORY, CLEAR_ALL_FILTERS, HITS, INGREDIENTS} from "../../../constants/labels";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {changeAlcoholic} from "../../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../../reducers/filter/categoryFilterReducer";
import StyledButton from "../../layout/StyledButton";
import {ALCOHOLIC_LIST, CATEGORY_LIST} from "../../../constants/filter_lists";
import DropDownPickerWrapper from "./drop_down/DropDownPickerWrapper";
import Label from "./Label";
import {setActiveFilter} from "../../../reducers/filter/activeFilterReducer";
import {ALCOHOLIC} from "../../../constants/labels";


const alcFilterOptions = ALCOHOLIC_LIST.ENG
const categoryFilterOptions = CATEGORY_LIST.ENG

export default function Filter(props: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const onHitsClickHandler = () => {
        dispatch(setActiveFilter(''))
    }

    return (
        <View style={styles.filter}>
            <View style={styles.rowStyle}>
                <FilterPanel options={alcFilterOptions}
                             labelName={ALCOHOLIC.ENG}
                             default={[ALL]}
                             isMultiSelectable={false}
                             filterState={state.alcoholicFilter}
                             setFilterState={changeAlcoholic}
                             numColumns={3}>

                </FilterPanel>
            </View>
            {/*<View>*/}
            {/*    <View style={styles.rowStyle}>*/}
            {/*        <FilterPanel options={glassFilterOptions}*/}
            {/*                     labelName={'Glass type'}*/}
            {/*                     default={[ALL]}*/}
            {/*                     isMultiSelectable={true}*/}
            {/*                     filterState={state.glassTypeFilter}*/}
            {/*                     setFilterState={changeGlassType}*/}
            {/*                     numColumns={3}>*/}
            {/*        </FilterPanel>*/}
            {/*    </View>*/}
            {/*</View>*/}
            <View style={styles.rowStyle}>
                <FilterPanel options={categoryFilterOptions}
                             labelName={CATEGORY.ENG}
                             default={[ALL]}
                             isMultiSelectable={true}
                             filterState={state.categoryFilter}
                             setFilterState={changeCategory}
                             numColumns={3}>
                </FilterPanel>
            </View>
            <View style={[styles.rowStyle, {
                flexDirection: 'row',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            }]}>
                <Label labelName={INGREDIENTS.ENG}/>
            </View>
            <DropDownPickerWrapper/>
            <View style={styles.buttonBackgroundStyle}>
                <StyledButton flex={1} onPress={props.onClearAllFiltersClickHandler} title={CLEAR_ALL_FILTERS.ENG}/>
                <StyledButton flex={1} onPress={onHitsClickHandler} title={`${HITS.ENG}: ${state.currentDataSet.length}`}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    filter: {
        width: vw(1),
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
    },
    rowStyle: {
        flexDirection: 'row',
        backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        marginLeft: MARGIN,
        marginRight: MARGIN,
        marginTop: MARGIN
    },
    buttonBackgroundStyle: {
        backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN,
        flexDirection: 'row',
    }
})
