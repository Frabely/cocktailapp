import {StyleSheet, Text, TextInput} from "react-native";
import {vw, vw_reactive} from "../../functions/dimentions";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import React, {Dispatch, SetStateAction} from "react";
import {COLOR_CARD_BACKGROUND, COLOR_INCORRECT_FIELD_INPUT} from "../../constants/color_styles";
import {useAppSelector} from "../../constants/hooks";
import {ErrorCodesType, Language} from "../../constants/types";

// const getErrorMessageFromJson = (languageJson: Language, errorState: ErrorCodesType): string => {
//     return languageJson.labels.ERROR_CODES[`${errorState.messageKey}`]
// }

export default function TextInputWithErrorMessage({errorState, setInputState,
                                                      placeholderLabel, inputState, isPassword}: TextInputWithErrorMessageProps) {
    const state = useAppSelector((state) => state)
    const language: Language = state.language

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
                    style={[styles.wrongInputMessage,
                        {maxWidth: vw_reactive(0.7, state.dimensions.width) - MARGIN - PADDING}]}>
                    {language.labels.ERROR_CODES[`${errorState.messageKey}`]}</Text>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: BORDER_RADIUS / 2,
        padding: PADDING,
        margin: MARGIN,
        // marginBottom: 0
    },
    wrongInputMessage: {
        maxWidth: vw(0.7) - MARGIN - PADDING,
        color: COLOR_INCORRECT_FIELD_INPUT,
        marginHorizontal:  MARGIN / 2,
        paddingHorizontal: PADDING,
        marginBottom: MARGIN
    }
})

export type TextInputWithErrorMessageProps = {
    errorState: ErrorCodesType | undefined,
    setInputState: Dispatch<SetStateAction<string>>,
    inputState: string,
    placeholderLabel: string,
    isPassword?: boolean
}
