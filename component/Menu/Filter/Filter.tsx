import {
    StyleSheet,
    View
} from "react-native";
import {vh, vw} from "../../../functions/dimentions";
import {
    LABEL_BACKGROUND
} from "../../../constants/color_styles";
import {BORDER_RADIUS, MARGIN} from "../../../constants/style_constants";
import FilterPanel from "./FilterPanel";
import {ALL} from "../../../constants/const_vars";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {changeAlcoholic} from "../../../reducers/Filter/alcoholicFilterReducer";
import {changeCategory} from "../../../reducers/Filter/categoryFilterReducer";
import StyledButton from "../../StyledButton";

const alcFilterOptions = [ALL, 'Alcoholic', 'Non alcoholic']
// const glassFilterOptions = [ALL, 'Margarita / Coupette', 'Cocktail', 'Collins', 'Highball', 'Pousse cafe', 'Wine']
const categoryFilterOptions = [ALL, 'Cocktail', 'Homemade Liqueur', 'Ordinary Drink', 'Punch / Party Drink', 'Coffee / Tea', 'Shot']

export default function Filter(props: any) {

    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const onClearAllFiltersClickHandler = () => {
        dispatch(changeAlcoholic([ALL]))
        dispatch(changeCategory([ALL]))
        props.setCurrentSearchFieldInput('')
    }

    return (

        <View
            style={styles.filter}>
            <View style={styles.rowStyle}>
                <FilterPanel options={alcFilterOptions}
                             labelName={'Alcoholic'}
                             default={[ALL]}
                             isMultiSelectable={false}
                             filterState={state.alcoholicFilter}
                             setFilterState={changeAlcoholic}
                             numColumns={3}>

                </FilterPanel>
            </View>
            {/*<View>*/}
            {/*    <View style={styles.rowStyle}>*/}
            {/*        <FilterPanel options={glassFilterOptions}*/}
            {/*                     labelName={'Glass type'}*/}
            {/*                     default={[ALL]}*/}
            {/*                     isMultiSelectable={true}*/}
            {/*                     filterState={state.glassTypeFilter}*/}
            {/*                     setFilterState={changeGlassType}*/}
            {/*                     numColumns={3}>*/}
            {/*        </FilterPanel>*/}
            {/*    </View>*/}
            {/*</View>*/}
            <View style={styles.rowStyle}>
                <FilterPanel options={categoryFilterOptions}
                             labelName={'Category'}
                             default={[ALL]}
                             isMultiSelectable={true}
                             filterState={state.category}
                             setFilterState={changeCategory}
                             numColumns={3}>
                </FilterPanel>
            </View>
            <StyledButton onPress={onClearAllFiltersClickHandler} title={'Clear all filters'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    filter: {
        display: "flex",
        height: vh(0.6),
        width: vw(1),
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        justifyContent: "center"
    },
    rowStyle: {
        flexDirection: 'row',
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN
    },
})
