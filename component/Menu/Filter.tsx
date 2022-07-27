import {StyleSheet, View, Text} from "react-native";
import {vh} from "../../functions/dimentions";
import {COLOR_OPACITY_BACKGROUND} from "../../global_exports/color_styles";
import {BORDER_RADIUS, PADDING} from "../../global_exports/border_margin_padding_defaults";
import FilterButton from "./FilterButton";
import Label from "./Label";

export default function Filter(props: any) {
    return (
        <View style={[styles.filter,]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <FilterButton title={'Clean all'}/>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
                <Label lableName={'alcoholic:'}/>
                <FilterButton title={'alcoholic'}></FilterButton>
                <FilterButton title={'non alcoholic'}></FilterButton>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
                <Label lableName={'Cocktail type:'}/>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
                <Label lableName={'Glass type:'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    filter: {
        backgroundColor: COLOR_OPACITY_BACKGROUND,
        height: vh(0.3),
        width: '100%',
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        padding: PADDING,
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        justifyContent: "center"
    }
})
