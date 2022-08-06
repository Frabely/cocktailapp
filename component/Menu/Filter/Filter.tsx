import {
    StyleSheet,
    View
} from "react-native";
import {vh, vw} from "../../../functions/dimentions";
import {
    LABEL_BACKGROUND
} from "../../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import FilterPanel from "./FilterPanel";
import {ALL} from "../../../constants/const_vars";
import {useAppSelector} from "../../../constants/hooks";
import {changeAlcoholic} from "../../../reducers/Filter/alcoholicFilterReducer";
import {changeCategory} from "../../../reducers/Filter/categoryFilterReducer";
import StyledButton from "../../StyledButton";
import {ALCOHOLIC_LIST, CATEGORY_LIST} from "../../../constants/filter_lists";
import DropDownPickerWrapper from "../DropDown/DropDownPickerWrapper";
import Label from "./Label";


const alcFilterOptions = ALCOHOLIC_LIST
const categoryFilterOptions = CATEGORY_LIST

export default function Filter(props: any) {
    const state = useAppSelector((state) => state)

    const onHitsClickHandler = () => {
        props.setActiveFilter('')
    }

    return (

        <View style={styles.filter}>
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
                             filterState={state.categoryFilter}
                             setFilterState={changeCategory}
                             numColumns={3}>
                </FilterPanel>
            </View>
            <View style={[styles.rowStyle, {flexDirection: 'row', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                <Label labelName={'Ingredients'}/>
            </View>
                <DropDownPickerWrapper
                    setIngredientsValue={props.setIngredientsValue}
                    ingredientsValue={props.ingredientsValue}/>
            <View style={styles.buttonBackgroundStyle}>
                <StyledButton onPress={props.onClearAllFiltersClickHandler} title={'Clear all filters'}/>
                <StyledButton onPress={onHitsClickHandler} title={`Hits: ${props.currentDataSetLength}`}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    filter: {
        // height: vh(0.9),
        width: vw(1),
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        // padding: PADDING
    },
    rowStyle: {
        flexDirection: 'row',
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS/2,
        marginLeft: MARGIN,
        marginRight: MARGIN,
        marginTop: MARGIN
    },
    buttonBackgroundStyle: {
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN,
        flexDirection: 'row',
    }
})
