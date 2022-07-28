import {FlatList, StyleSheet} from "react-native";
import Label from "./Label";
import FilterButton from "./FilterButton";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../global_exports/color_styles";
import {useState} from "react";

export default function FilterPanel(props: any) {
    const [currentFilter, setCurrentFilter] = useState(props.default)

    const onFilterButtonClickHandler = (filterName: string) => {
        setCurrentFilter(filterName)
    }

    const renderItem = ({item, index}: any) => {
        return (
            <FilterButton
                key={item}
                title={item}
                colorActive={COLOR_HEADER}
                colorInactive={COLOR_BACKGROUND}
                onClick={onFilterButtonClickHandler}
                currentFilter={currentFilter}
            />
        )
    }

    return(
        <>
            <Label lableName={'Alcoholic'}/>
            <FlatList data={props.options} renderItem={renderItem} numColumns={3} style={styles.flatList}/>
        </>

    )
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
})
