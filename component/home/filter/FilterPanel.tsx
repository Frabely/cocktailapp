import {StyleSheet, View, ScrollView} from "react-native";
import Label from "./Label";
import FilterButton from "./FilterButton";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../../constants/color_styles";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {ALL} from "../../../constants/const_vars";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {MARGIN, PADDING} from "../../../constants/style_constants";
import {vh_reactive} from "../../../functions/dimentions";
import {getDefaultButtonHeight} from "../../../functions/viewport_calculations";

export default function FilterPanel({
                                        filterState,
                                        setFilterState,
                                        isMultiSelectable,
                                        optionsTitle,
                                        optionsENG,
                                        labelName,
                                        isIcon
                                    }: FilterPanelProps) {
    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => state)

    const onFilterButtonClickHandler = (filterName: string) => {
        const array = [...filterState]
        if (filterName === ALL) {
            dispatch(setFilterState([ALL]))
            return
        }
        let resultArray = []
        if (!isMultiSelectable) {
            resultArray.push(filterName)
            dispatch(setFilterState(resultArray))

        }
        if (isMultiSelectable) {
            if (!array.includes(filterName)) {
                array.push(filterName)
                if (optionsTitle && array.length === optionsTitle.length - 1)
                    resultArray = [ALL]
                else
                    resultArray = array
            } else {
                resultArray = array.filter(itemOnIndex => itemOnIndex !== filterName)
                if (resultArray.length === 0)
                    resultArray.push(ALL)
            }
        }
        if (array.includes(ALL) && array.length > 1) {
            resultArray = array.filter(itemOnIndex => itemOnIndex !== ALL)
        }
        dispatch(setFilterState(resultArray))
    }

    return (
        <View style={styles.filterPanel}>
            <Label labelName={labelName}/>
            <ScrollView>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {optionsTitle ? optionsTitle.map((item: string, index: number) => {
                        if (item) {
                            return <View key={index}
                                         style={[styles.flatListItem,
                                             {minHeight: vh_reactive(getDefaultButtonHeight(state.dimensions.orientationInfo), state.dimensions.height)}
                                         ]}>
                                <FilterButton
                                    isIcon={isIcon}
                                    title={item}
                                    titleENG={optionsENG[index]}
                                    colorActive={COLOR_HEADER}
                                    colorInactive={COLOR_BACKGROUND}
                                    onClick={onFilterButtonClickHandler}
                                    state={filterState}
                                    padding={PADDING / 2}
                                    margin={MARGIN / 2}
                                />
                            </View>
                        }
                    }) : null}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    flatListItem: {
        width: '33.33333%'
    },
    filterPanel: {
        width: '100%',
        flexDirection: 'column'
    },
})

export type FilterPanelProps = {
    isMultiSelectable: boolean,
    filterState: any[],
    isIcon: boolean,
    setFilterState: ActionCreatorWithPayload<any[]>,
    optionsTitle: readonly string[],
    optionsENG: readonly string[],
    labelName: string,
}
