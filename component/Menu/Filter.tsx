import {StyleSheet, View, Text, ColorValue} from "react-native";
import {vh} from "../../functions/dimentions";
import {
    COLOR_BACKGROUND,
    COLOR_HEADER,
    COLOR_OPACITY_BACKGROUND,
    LABEL_BACKGROUND
} from "../../global_exports/color_styles";
import {BORDER_RADIUS, PADDING} from "../../global_exports/border_margin_padding_defaults";
import FilterButton from "./FilterButton";
import Label from "./Label";
import Switch from "./Switch";

export default function Filter(props: any) {
    const onClearAllFiltersClickHandler = () => {

    }

    return (
        <View style={[styles.filter,]}>
            <View style={{padding: PADDING,}}>
                <FilterButton onClick={onClearAllFiltersClickHandler} color={COLOR_BACKGROUND} title={'Clean all filters'}/>
            </View>
            <View style={styles.rowStyle}>
                <View style={{flex: 1}}>
                    <Label lableName={'Alcoholic'}/>
                </View>
                <View style={{flex: 2.5}}>
                    <Switch color={COLOR_BACKGROUND} colorSelected={COLOR_HEADER} leftTitle={'Alcoholic'}
                            rightTitle={'Non alcoholic'}></Switch>
                </View>
            </View>
            <View style={styles.rowStyle}>
                <Label lableName={'Cocktail type'}/>
            </View>
            <View style={styles.rowStyle}>
                <Label lableName={'Glass type'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    filter: {
        backgroundColor: COLOR_OPACITY_BACKGROUND,
        height: vh(0.5),
        width: '100%',
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        padding: PADDING,
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        justifyContent: "center"
    },
    rowStyle: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: 10
    }
})
