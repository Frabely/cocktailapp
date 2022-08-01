import {FlatList, StyleSheet, View} from "react-native";
import Label from "./Label";
import FilterButton from "./FilterButton";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../global_exports/color_styles";
import {useState} from "react";
import {ALL} from "../../global_exports/const_vars";
import removeItemFromIndex from "../../functions/remove_item_from_array";

export default function FilterPanel(props: any) {
    const [currentFilter, setCurrentFilter] = useState(props.default)

    const onFilterButtonClickHandler = (filterName: string) => {
        if (!props.isMultiSelectable) {
            const array = [...currentFilter]
            array[0] = filterName
            setCurrentFilter(array)
        }
        if (props.isMultiSelectable) {
            const array = [...currentFilter]

            if (filterName === ALL) {
                setCurrentFilter([ALL])
                return
            }
            if (!array.includes(filterName)) {
                array.push(filterName)
                setCurrentFilter(array)
            } else if (array.includes(filterName)) {
                setCurrentFilter(removeItemFromIndex(array, filterName))
            }
            if (array.length === 0 || array.length < 0) {
                array.push(ALL)
                setCurrentFilter(array)
                return
            }
            if (array.includes(ALL) && array.length > 1) {
                setCurrentFilter(removeItemFromIndex(array, ALL))
                return
            }
        }
    }

    const renderItem = ({item, index}: any) => {
        return (
            <View style={styles.flatListItem}>
                <FilterButton
                    key={item}
                    title={item}
                    colorActive={COLOR_HEADER}
                    colorInactive={COLOR_BACKGROUND}
                    onClick={onFilterButtonClickHandler}
                    currentFilter={currentFilter}
                />
            </View>
        )
    }

    return (
        <View style={styles.filterPanel}>
            <Label labelName={props.labelName}/>
            {/*TODO remove Flatlist as Grid item to make sure andriod does not throw error
                D:\react_native_workspace\cocktailapp\node_modules\react-native\Libraries\Core\ExceptionsManager.js:149
                VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality
                - use another VirtualizedList-backed container instead.
           */}
            {/*<View style={styles.container}>*/}
            {/*    {props.options.map((item: any, index: number) => {*/}
            {/*        if (index%3 ===0 ) {*/}
            {/*            index= index-1*/}
            {/*            return (<View style={{flexDirection: 'row', height: vh(0.1)}}>*/}
            {/*                <View style={styles.flatListItem}>*/}
            {/*                    <FilterButton*/}
            {/*                        key={item}*/}
            {/*                        title={item}*/}
            {/*                        colorActive={COLOR_HEADER}*/}
            {/*                        colorInactive={COLOR_BACKGROUND}*/}
            {/*                        onClick={onFilterButtonClickHandler}*/}
            {/*                        currentFilter={currentFilter}*/}
            {/*                    />*/}
            {/*                </View>*/}
            {/*            </View>)*/}
            {/*        }*/}
            {/*        return (*/}
            {/*                <View style={styles.flatListItem}>*/}
            {/*                    <FilterButton*/}
            {/*                        key={item}*/}
            {/*                        title={item}*/}
            {/*                        colorActive={COLOR_HEADER}*/}
            {/*                        colorInactive={COLOR_BACKGROUND}*/}
            {/*                        onClick={onFilterButtonClickHandler}*/}
            {/*                        currentFilter={currentFilter}*/}
            {/*                    />*/}
            {/*                </View> )*/}
            {/*})}*/}
            {/*</View>*/}
            <FlatList data={props.options} renderItem={renderItem} numColumns={props.numColumns}/>
        </View>

    )
}

const styles = StyleSheet.create({
    flatListItem: {
        width: '33.33333%',
    },
    filterPanel: {
        width: '100%'
    }
})
