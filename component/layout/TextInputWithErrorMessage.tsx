import {StyleSheet, Text, TextInput} from "react-native";
import {vw} from "../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import React, {Dispatch, SetStateAction} from "react";
import {COLOR_CARD_BACKGROUND, COLOR_HEADER, COLOR_INCORRECT_FIELD_INPUT} from "../../constants/color_styles";
import {useAppSelector} from "../../constants/hooks";
import {ErrorCodesType} from "../../constants/types";

export default function TextInputWithErrorMessage({errorState, setInputState, placeholderLabel, inputState}: TextInputWithErrorMessageProps) {
    const state = useAppSelector((state) => state)
    const language: string = state.language

    return (
        <>
            <TextInput
                style={[styles.input,
                    (errorState ? {backgroundColor: COLOR_INCORRECT_FIELD_INPUT} : {backgroundColor: COLOR_CARD_BACKGROUND})]}
                onChangeText={input => {
                    setInputState(input.trim())
                }}
                placeholder={placeholderLabel}
                value={inputState}
                selectTextOnFocus={true}/>
            {errorState ? (
                <Text
                    style={styles.wrongInputMessage}>{errorState?.message[`${language}`]}</Text>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    inputCard: {
        width: '100%',
        marginBottom: MARGIN / 2,
        backgroundColor: COLOR_HEADER,
        borderRadius: BORDER_RADIUS / 2,
    },
    input: {
        borderRadius: BORDER_RADIUS / 2,
        padding: PADDING,
        margin: MARGIN
    },
    wrongInputMessage: {
        maxWidth: vw(0.7) - MARGIN - PADDING,
        color: COLOR_INCORRECT_FIELD_INPUT,
        marginLeft: MARGIN,
        paddingLeft: PADDING,
        marginRight: MARGIN,
        paddingRight: PADDING
    }
})

export type TextInputWithErrorMessageProps = {
    errorState: ErrorCodesType | undefined,
    setInputState: Dispatch<SetStateAction<any>>,
    inputState: string,
    placeholderLabel: string
}
