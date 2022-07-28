import {Animated, StyleSheet, View} from "react-native";
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
import {useState} from "react";

export default function Filter(props: any) {
    const [alcoholicFilter, setAlcoholicFilter] = useState('All')
    const onClearAllFiltersClickHandler = () => {
    }
    return (
        <Animated.View
            style={[
                styles.filter,
                {
                    // Bind height to animated value
                    height: props.openMenuAnimation
                }
            ]}
        >
            {props.isFilterIconPressed && (
                <>
                    <View style={{padding: PADDING,}}>
                        <FilterButton onClick={onClearAllFiltersClickHandler} colorActive={COLOR_HEADER} colorInactive={COLOR_BACKGROUND}
                                      title={'Clean all filters'}/>
                    </View>
                    <View style={styles.rowStyle}>
                            <Label lableName={'Alcoholic'}/>
                            <FilterButton title={'All'} colorActive={COLOR_HEADER} colorInactive={COLOR_BACKGROUND} onClick={() => {}}></FilterButton>
                            <FilterButton title={'Alcoholic'} colorActive={COLOR_HEADER} colorInactive={COLOR_BACKGROUND} onClick={() => {}}></FilterButton>
                            <FilterButton title={'Non alcoholic'} colorActive={COLOR_HEADER} colorInactive={COLOR_BACKGROUND} onClick={() => {}}></FilterButton>
                    </View>
                    <View style={styles.rowStyle}>
                        <Label lableName={'Cocktail type'}/>
                    </View>
                    <View style={styles.rowStyle}>
                        <Label lableName={'Glass type'}/>
                    </View>
                </>
            )}
        </Animated.View>
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
        // padding: PADDING,
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
