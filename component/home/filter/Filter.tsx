import {ScrollView, StyleSheet, View} from "react-native";
import {vh_reactive, vw, vw_reactive} from "../../../functions/dimentions";
import {COLOR_CARD_BACKGROUND} from "../../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import FilterPanel from "./FilterPanel";
import {
    CATEGORY_LABEL,
    CLEAR_ALL_FILTERS_LABEL,
    HITS_LABEL,
    INGREDIENTS_LABEL, SORT_LABEL
} from "../../../constants/labels";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {changeAlcoholic} from "../../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../../reducers/filter/categoryFilterReducer";
import StyledButton from "../../layout/StyledButton";
import {ALCOHOLIC_LIST, CATEGORY_LIST, SORT_LIST} from "../../../constants/filter_lists";
import DropDownPickerWrapper from "./drop_down/DropDownPickerWrapper";
import Label from "./Label";
import {setActiveFilter} from "../../../reducers/filter/activeFilterReducer";
import {ALCOHOLIC_LABEL} from "../../../constants/labels";
import React from "react";
import {changeSort} from "../../../reducers/filter/sortFilterReducer";

export default function Filter({onPress, lengthDataSet}: FilterProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: string = state.language
    const alcFilterOptions: readonly string[] = ALCOHOLIC_LIST[`${language}`]
    const alcFilterOptionsENG: readonly string[] = ALCOHOLIC_LIST.ENG
    const categoryFilterOptions: readonly string[] = CATEGORY_LIST[`${language}`]
    const categoryFilterOptionsENG: readonly string[] = CATEGORY_LIST.ENG
    const sortFilterOptions: readonly string[] = SORT_LIST[`${language}`]
    const sortFilterOptionsENG: readonly string[] = SORT_LIST.ENG

    const onHitsClickHandler = () => {
        dispatch(setActiveFilter(''))
    }

    return (
        <ScrollView
            style={[styles.filter, {
                width: vw_reactive(1, state.dimensions.width),
                height: vh_reactive(0.8, state.dimensions.height)
            }]}>
            <View style={styles.rowStyle}>
                <FilterPanel optionsTitle={alcFilterOptions}
                             isIcon={false}
                             optionsENG={alcFilterOptionsENG}
                             labelName={ALCOHOLIC_LABEL[`${language}`]}
                             isMultiSelectable={false}
                             filterState={state.alcoholicFilter}
                             setFilterState={changeAlcoholic}/>
            </View>
            <View style={styles.rowStyle}>
                <FilterPanel optionsTitle={categoryFilterOptions}
                             isIcon={false}
                             optionsENG={categoryFilterOptionsENG}
                             labelName={CATEGORY_LABEL[`${language}`]}
                             isMultiSelectable={true}
                             filterState={state.categoryFilter}
                             setFilterState={changeCategory}/>
            </View>
            <View style={[styles.rowStyle, {
                flexDirection: 'row',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            }]}>
                <Label labelName={INGREDIENTS_LABEL[`${language}`]}/>
            </View>
            <DropDownPickerWrapper/>
            <View style={styles.rowStyle}>
                <FilterPanel optionsTitle={sortFilterOptions}
                             isIcon={true}
                             optionsENG={sortFilterOptionsENG}
                             labelName={SORT_LABEL[`${language}`]}
                             isMultiSelectable={false}
                             filterState={state.sortFilter}
                             setFilterState={changeSort}/>
            </View>
            <View style={styles.buttonBackgroundStyle}>
                <StyledButton
                    flex={1}
                    margin={MARGIN / 2}
                    padding={PADDING}
                    onPress={onPress}
                    title={CLEAR_ALL_FILTERS_LABEL[`${language}`]}/>
                <StyledButton
                    flex={1}
                    margin={MARGIN / 2}
                    padding={PADDING}
                    onPress={onHitsClickHandler}
                    title={`${HITS_LABEL[`${language}`]}: ${lengthDataSet}`}/>
            </View>
        </ScrollView>
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
    onPress: (({...args}: any) => any),
    lengthDataSet: number
}
