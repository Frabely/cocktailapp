import {FlatList, StyleSheet, View} from "react-native";
import Label from "./Label";
import FilterButton from "./FilterButton";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../../constants/color_styles";
import {useAppDispatch} from "../../../constants/hooks";
import {ALL} from "../../../constants/const_vars";

export default function FilterPanel(props: any) {
    const dispatch = useAppDispatch()

    const onFilterButtonClickHandler = (filterName: string) => {
        const array = [...props.filterState]
        if (filterName === ALL) {
            dispatch(props.setFilterState([ALL]))
            return
        }
        let resultArray = []
        if (!props.isMultiSelectable) {
            resultArray.push(filterName)
            dispatch(props.setFilterState(resultArray))

        }
        if (props.isMultiSelectable) {
            if (!array.includes(filterName)) {
                array.push(filterName)
                if (array.length === props.options.length - 1)
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
        dispatch(props.setFilterState(resultArray))
    }

    const renderItem = ({item, index}: any) => {
        return (
            <View style={styles.flatListItem}>
                <FilterButton
                    title={item}
                    titleENG={props.optionsENG[index]}
                    colorActive={COLOR_HEADER}
                    colorInactive={COLOR_BACKGROUND}
                    onClick={onFilterButtonClickHandler}
                    state={props.filterState}
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
            <FlatList keyExtractor={(item) => item} data={props.options} renderItem={renderItem} numColumns={props.numColumns}/>
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
