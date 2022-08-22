import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {StyleSheet, View} from "react-native";
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {
    EMAIL_LABEL,
    LOGIN_LABEL, RESET_PASSWORD_EMAIL_SENT_LABEL,
    SEND_RESET_PASSWORD_EMAIL_LABEL
} from "../../constants/labels";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {changeModalMessage} from "../../reducers/general/modalMessageReducer";
import {invertIsModalState} from "../../reducers/booleans/isModalReducer";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {app} from "../../functions/firebase";
import TextInputWithErrorMessage from "../layout/TextInputWithErrorMessage";
import StyledButton from "../layout/StyledButton";
import {login} from "../../reducers/login/loginStateReducer";
import {getEmailError} from "../../functions/getErrorFunctionsInputs";
import ForgotPasswordButton from "./ForgotPasswordButton";

export default function ForgotPassword({}: ForgotPasswordProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('');
    const [errorEmailState, setErrorEmailState] = useState<string [] | undefined>(undefined);
    const language: string = state.language

    const changeToLoginScreenPressHandler = () => {
        dispatch(login())
    }

    const sendVerificationEmailPressHandler = () => {
        const auth = getAuth(app);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                console.log(error.message)
            });
        dispatch(changeModalMessage(RESET_PASSWORD_EMAIL_SENT_LABEL[`${language}`]))
        dispatch(invertIsModalState())
        dispatch(login())
    }

    return (
        <>
            <View style={styles.inputCard}>
                <TextInputWithErrorMessage errorState={ (errorEmailState) ? getEmailError(errorEmailState) : undefined} setInputState={setEmail} inputState={email}
                                           placeholderLabel={EMAIL_LABEL[`${language}`]}/>
            </View>
            <View style={{marginVertical: MARGIN / 2}}>
                <StyledButton
                    padding={PADDING}
                    onPress={sendVerificationEmailPressHandler}
                    title={SEND_RESET_PASSWORD_EMAIL_LABEL[`${language}`]}
                />
            </View>
            <View style={{marginVertical: MARGIN / 2}}>
                <StyledButton
                    padding={PADDING}
                    onPress={changeToLoginScreenPressHandler}
                    title={LOGIN_LABEL[`${language}`]}
                />
            </View>
            <ForgotPasswordButton/>
        </>
    )
}

const styles = StyleSheet.create({
    inputCard: {
        width: '100%',
        marginBottom: MARGIN / 2,
        backgroundColor: COLOR_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
    },
})

export type ForgotPasswordProps = {}
