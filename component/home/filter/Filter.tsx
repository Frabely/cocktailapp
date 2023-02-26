import {ScrollView, StyleSheet, View} from "react-native";
import {vh_reactive, vw, vw_reactive} from "../../../functions/dimentions";
import {COLOR_CARD_BACKGROUND} from "../../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import FilterPanel from "./FilterPanel";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {changeAlcoholic} from "../../../reducers/filter/alcoholicFilterReducer";
import {changeCategory} from "../../../reducers/filter/categoryFilterReducer";
import StyledButton from "../../layout/StyledButton";
import DropDownPickerWrapper from "./drop_down/DropDownPickerWrapper";
import Label from "./Label";
import {setActiveFilter} from "../../../reducers/filter/activeFilterReducer";
import React from "react";
import {changeSort} from "../../../reducers/filter/sortFilterReducer";
import {Language} from "../../../constants/types";
import en from "../../../constants/en.json"

export default function Filter({onPress, lengthDataSet}: FilterProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: Language = state.language
    const alcFilterOptions: readonly string[] = language.labels.ALCOHOLIC_LIST
    const alcFilterOptionsENG: readonly string[] = en.labels.ALCOHOLIC_LIST
    const categoryFilterOptions: readonly string[] = language.labels.CATEGORY_LIST
    const categoryFilterOptionsENG: readonly string[] = en.labels.CATEGORY_LIST
    const sortFilterOptions: readonly string[] = language.labels.SORT_LIST
    const sortFilterOptionsENG: readonly string[] = en.labels.SORT_LIST

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
                <FilterPanel optionsTitle={sortFilterOptions}
                             isIcon={true}
                             optionsENG={sortFilterOptionsENG}
                             labelName={language.labels.SORT_LABEL}
                             isMultiSelectable={false}
                             filterState={state.sortFilter}
                             setFilterState={changeSort}/>
            </View>
            <View style={styles.rowStyle}>
                <FilterPanel optionsTitle={alcFilterOptions}
                             isIcon={false}
                             optionsENG={alcFilterOptionsENG}
                             labelName={language.labels.ALCOHOLIC_LABEL}
                             isMultiSelectable={false}
                             filterState={state.alcoholicFilter}
                             setFilterState={changeAlcoholic}/>
            </View>
            <View style={styles.rowStyle}>
                <FilterPanel optionsTitle={categoryFilterOptions}
                             isIcon={false}
                             optionsENG={categoryFilterOptionsENG}
                             labelName={language.labels.CATEGORY_LABEL}
                             isMultiSelectable={true}
                             filterState={state.categoryFilter}
                             setFilterState={changeCategory}/>
            </View>
            <View style={[styles.rowStyle, {
                flexDirection: 'row',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            }]}>
                <Label labelName={language.labels.INGREDIENTS_LABEL}/>
            </View>
            {/*TODO <DropDownPickerWrapper/>*/}
            <View style={styles.buttonBackgroundStyle}>
                <StyledButton
                    flex={1}
                    margin={MARGIN / 2}
                    padding={PADDING}
                    onPress={onPress}
                    title={language.labels.CLEAR_ALL_FILTERS_LABEL}/>
                <StyledButton
                    flex={1}
                    margin={MARGIN / 2}
                    padding={PADDING}
                    onPress={onHitsClickHandler}
                    title={`${language.labels.HITS_LABEL}: ${lengthDataSet}`}/>
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
