import {FlatList, StyleSheet, View} from "react-native";
import Label from "./Label";
import FilterButton from "./FilterButton";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../global_exports/color_styles";
import {useState} from "react";
import {vh} from "../../functions/dimentions";

export default function FilterPanel(props: any) {
    const [currentFilter, setCurrentFilter] = useState(props.default)

    const onFilterButtonClickHandler = (filterName: string) => {
        setCurrentFilter(filterName)
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
