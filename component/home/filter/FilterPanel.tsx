import {FlatList, StyleSheet, View} from "react-native";
import Label from "./Label";
import FilterButton from "./FilterButton";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../../constants/color_styles";
import {useAppDispatch} from "../../../constants/hooks";
import {ALL} from "../../../constants/const_vars";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {MARGIN, PADDING} from "../../../constants/style_constants";
import {vh} from "../../../functions/dimentions";

export default function FilterPanel({filterState, setFilterState, isMultiSelectable,
                                        options, optionsENG, labelName, numColumns}: FilterPanelProps) {
    const dispatch = useAppDispatch()

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
                if (options && array.length === options.length - 1)
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

    const renderItem = ({item, index}: any) => {
        return (
            <View style={styles.flatListItem}>
                <FilterButton
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
        )
    }

    return (
        <View style={styles.filterPanel}>
            <Label labelName={labelName}/>
            <FlatList keyExtractor={(item) => item} data={options} renderItem={renderItem} numColumns={numColumns}/>
        </View>

    )
}

const styles = StyleSheet.create({
    flatListItem: {
        flex: 1,
        minHeight: vh(0.08)
    },
    filterPanel: {
        width: '100%'
    }
})

export type FilterPanelProps = {
    isMultiSelectable: boolean,
    filterState: any[],
    setFilterState:  ActionCreatorWithPayload<any[]>,
    options:  readonly string[] | null | undefined,
    optionsENG: readonly string[],
    labelName: string,
    numColumns: number
}
