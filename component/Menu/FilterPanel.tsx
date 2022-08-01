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
