import {Animated, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, View} from "react-native";
import {COLOR_OPACITY_BACKGROUND, LABEL_BACKGROUND} from "../../../constants/color_styles";
import {vh, vw} from "../../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import {useState} from "react";
import StyledButton from "../../StyledButton";

export default function searchField(props: any) {
    const onHitsClickHandler = () => {
        props.setActiveFilter('')
    }

    return (
        <View style={styles.searchField}>
            <View>
                <TextInput value={props.currentSearchFieldInput} onChangeText={input => {
                    props.setCurrentSearchFieldInput(input)
                }}
                           style={styles.testInput} placeholder={'Enter search term'}/>
            </View>
            <View style={styles.buttonBackgroundStyle}>
                <StyledButton onPress={onHitsClickHandler} title={`Hits: ${props.currentDataSetLength}`}/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    searchField: {
        width: vw(1),
        position: "absolute",
        left: 0,
        top: 1,
        zIndex: 1,
    },
    testInput: {
        padding: PADDING,
        backgroundColor: LABEL_BACKGROUND,
        margin: MARGIN,
        borderRadius: BORDER_RADIUS
    },
    buttonBackgroundStyle: {
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        margin: MARGIN,
        marginTop: MARGIN/10
    }
})
