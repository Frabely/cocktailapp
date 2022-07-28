import {FlatList, StyleSheet} from "react-native";
import Label from "./Label";
import FilterButton from "./FilterButton";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../global_exports/color_styles";
import {useState} from "react";

export default function FilterPanel(props: any) {
    const [alcoholicFilter, setAlcoholicFilter] = useState(props.default)

    const onFilterButtonClickHandler = () => {
    }

    const renderItem = ({item, index}: any) => {
        console.log(item)
        return (
            <FilterButton
                key={item}
                title={item}
                colorActive={COLOR_HEADER}
                colorInactive={COLOR_BACKGROUND}
                onClick={onFilterButtonClickHandler}
            />
        )
    }

    const onFilterChangeHandler = () => {

    }

    return(
        <>
            <Label lableName={'Alcoholic'}/>
            <FlatList data={props.options} renderItem={renderItem} numColumns={3} style={styles.flatList}/>
            {/*<FilterButton title={'All'} colorActive={COLOR_HEADER} colorInactive={COLOR_BACKGROUND} onClick={onFilterChangeHandler}></FilterButton>*/}
            {/*<FilterButton title={'Alcoholic'} colorActive={COLOR_HEADER} colorInactive={COLOR_BACKGROUND} onClick={onFilterChangeHandler}></FilterButton>*/}
            {/*<FilterButton title={'Non alcoholic'} colorActive={COLOR_HEADER} colorInactive={COLOR_BACKGROUND} onClick={onFilterChangeHandler}></FilterButton>*/}
        </>

    )
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
})
