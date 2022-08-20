import {StyleSheet, Text, TextInput} from "react-native";
import {vw} from "../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import React, {Dispatch, SetStateAction} from "react";
import {COLOR_CARD_BACKGROUND, COLOR_INCORRECT_FIELD_INPUT} from "../../constants/color_styles";
import {useAppSelector} from "../../constants/hooks";
import {ErrorCodesType} from "../../constants/types";

export default function TextInputWithErrorMessage({errorState, setInputState,
                                                      placeholderLabel, inputState, isPassword}: TextInputWithErrorMessageProps) {
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
                selectTextOnFocus={true}
                secureTextEntry={(isPassword) ? isPassword : isPassword}/>
            {errorState ? (
                <Text
                    style={styles.wrongInputMessage}>{errorState?.message[`${language}`]}</Text>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: BORDER_RADIUS / 2,
        padding: PADDING,
        margin: MARGIN,
        marginBottom: 0
    },
    wrongInputMessage: {
        maxWidth: vw(0.7) - MARGIN - PADDING,
        color: COLOR_INCORRECT_FIELD_INPUT,
        marginHorizontal:  MARGIN / 2,
        paddingHorizontal: PADDING,
        marginTop: MARGIN / 2
    }
})

export type TextInputWithErrorMessageProps = {
    errorState: ErrorCodesType | undefined,
    setInputState: Dispatch<SetStateAction<string>>,
    inputState: string,
    placeholderLabel: string,
    isPassword?: boolean
}
