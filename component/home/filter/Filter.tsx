import {StyleSheet, View} from "react-native";
import {vw, vw_reactive} from "../../../functions/dimentions";
import {COLOR_CARD_BACKGROUND} from "../../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import FilterPanel from "./FilterPanel";
import {
    CATEGORY_LABEL,
    CLEAR_ALL_FILTERS_LABEL,
    HITS_LABEL,
    INGREDIENTS_LABEL
} from "../../../constants/labels";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {changeAlcoholic} from "../../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../../reducers/filter/categoryFilterReducer";
import StyledButton from "../../layout/StyledButton";
import {ALCOHOLIC_LIST, CATEGORY_LIST} from "../../../constants/filter_lists";
import DropDownPickerWrapper from "./drop_down/DropDownPickerWrapper";
import Label from "./Label";
import {setActiveFilter} from "../../../reducers/filter/activeFilterReducer";
import {ALCOHOLIC_LABEL} from "../../../constants/labels";

export default function Filter({onClearAllFiltersClickHandler}: FilterProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: string = state.language
    const alcFilterOptions: readonly string[] = ALCOHOLIC_LIST[`${language}`]
    const alcFilterOptionsENG: readonly string[] = ALCOHOLIC_LIST.ENG
    const categoryFilterOptions: readonly string[] = CATEGORY_LIST[`${language}`]
    const categoryFilterOptionsENG: readonly string[] = CATEGORY_LIST.ENG

    const onHitsClickHandler = () => {
        dispatch(setActiveFilter(''))
    }

    return (
        <View style={[styles.filter, {width: vw_reactive(1, state.dimensions.width)}]}>
            <View style={styles.rowStyle}>
                <FilterPanel options={alcFilterOptions}
                             optionsENG={alcFilterOptionsENG}
                             labelName={ALCOHOLIC_LABEL[`${language}`]}
                             isMultiSelectable={false}
                             filterState={state.alcoholicFilter}
                             setFilterState={changeAlcoholic}
                             numColumns={3}/>
            </View>
            <View style={styles.rowStyle}>
                <FilterPanel options={categoryFilterOptions}
                             optionsENG={categoryFilterOptionsENG}
                             labelName={CATEGORY_LABEL[`${language}`]}
                             isMultiSelectable={true}
                             filterState={state.categoryFilter}
                             setFilterState={changeCategory}
                             numColumns={3}/>
            </View>
            <View style={[styles.rowStyle, {
                flexDirection: 'row',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            }]}>
                <Label labelName={INGREDIENTS_LABEL[`${language}`]}/>
            </View>
            <DropDownPickerWrapper/>
            <View style={styles.buttonBackgroundStyle}>
                <StyledButton
                    flex={1}
                    margin={MARGIN / 2}
                    padding={PADDING}
                    onPress={onClearAllFiltersClickHandler}
                    title={CLEAR_ALL_FILTERS_LABEL[`${language}`]}/>
                <StyledButton
                    flex={1}
                    margin={MARGIN / 2}
                    padding={PADDING}
                    onPress={onHitsClickHandler}
                    title={`${HITS_LABEL[`${language}`]}: ${state.currentDataSet.length}`}/>
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

export type FilterProps = {
    onClearAllFiltersClickHandler: (() => void)
}
