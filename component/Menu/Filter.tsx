import {
    Animated,
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from "react-native";
import {vw} from "../../functions/dimentions";
import {
    COLOR_OPACITY_BACKGROUND,
    LABEL_BACKGROUND
} from "../../global_exports/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../global_exports/border_margin_padding_defaults";
import FilterPanel from "./FilterPanel";
import {ALL} from "../../global_exports/const_vars";

const alcFilterOptions = [ALL, 'Alcoholic', 'Non alcoholic']
const glassFilterOptions = [ALL, 'Margarita / Coupette', 'Cocktail', 'Collins', 'Highball', 'Pousse cafe', 'Wine']
const categoryFilterOptions = [ALL, 'Cocktail', 'Homemade Liqueur', 'Ordinary Drink', 'Punch / Party Drink', 'Coffee / Tea', 'Shot']

export default function Filter(props: any) {
    const onClearAllFiltersClickHandler = () => {
    }
    return (
        <Animated.View
            style={[
                styles.filter,
                {
                    // Bind height to animated value
                    height: props.openMenuAnimation
                    // transform: [{ scaleX: props.openMenuAnimation }],
                }
            ]}
        >
            {props.isFilterIconPressed && (
                <ScrollView>
                    <View>
                        <TextInput style={styles.testInput} placeholder={'Enter search term'}></TextInput>
                    </View>
                    <View style={styles.rowStyle}>
                        <FilterPanel options={alcFilterOptions}
                                     labelName={'Alcoholic'}
                                     default={[ALL]}
                                     isMultiSelectable={false}
                                     numColumns={3}>

                        </FilterPanel>
                    </View>
                    <View>
                        <View style={styles.rowStyle}>
                            <FilterPanel options={glassFilterOptions}
                                         labelName={'Glass type'}
                                         default={[ALL]}
                                         isMultiSelectable={true}
                                         numColumns={3}>
                            </FilterPanel>
                        </View>
                    </View>
                    <View style={styles.rowStyle}>
                        <FilterPanel options={categoryFilterOptions}
                                     labelName={'Category'}
                                     default={[ALL]}
                                     isMultiSelectable={true}
                                     numColumns={3}>
                        </FilterPanel>
                    </View>
                    {/*<View style={{padding: PADDING,}}>*/}
                    {/*    <FilterButton onClick={onClearAllFiltersClickHandler}*/}
                    {/*                  colorActive={COLOR_HEADER}*/}
                    {/*                  colorInactive={COLOR_BACKGROUND}*/}
                    {/*                  title={'Clean all filters'}/>*/}
                    {/*</View>*/}
                </ScrollView>
            )}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    filter: {
        backgroundColor: COLOR_OPACITY_BACKGROUND,
        width: vw(1),
        // width: '100%',
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        // padding: PADDING,
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        justifyContent: "center"
    },
    rowStyle: {
        flexDirection: 'row',
        // flex: 1,
        // justifyContent: 'space-between',
        // alignItems: "center",
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN
    },
    testInput: {
        padding: PADDING,
        backgroundColor: LABEL_BACKGROUND,
        margin: MARGIN,
        borderRadius: BORDER_RADIUS
    }
})
