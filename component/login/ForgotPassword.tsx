import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {StyleSheet, View} from "react-native";
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {
    EMAIL_LABEL,
    LOGIN_PAGE_LABEL, RESET_PASSWORD_EMAIL_SENT_LABEL,
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
import {EMAIL_MISSING} from "../../constants/error_codes";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../reducers/booleans/isLoadingReducer";
import {
    INVALID_EMAIL,
    NETWORK_REQUEST_FAILED,
    TOO_MANY_REQUESTS, USER_NOT_FOUND
} from "../../constants/error_codes_firebase";

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
        dispatch(setIsLoadingTrue())
        const auth = getAuth(app);
        let errorArrayEmail: string[] = []
        if (email === '') {
            setEmail('')
            errorArrayEmail.push(EMAIL_MISSING.code)
        }
        if (errorArrayEmail.length > 0) {
            setErrorEmailState(errorArrayEmail)
            dispatch(setIsLoadingFalse())
            return
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                dispatch(setIsLoadingFalse())
                dispatch(changeModalMessage(RESET_PASSWORD_EMAIL_SENT_LABEL[`${language}`]))
                dispatch(invertIsModalState())
                dispatch(login())
            })
            .catch((error) => {
                if (error.code === INVALID_EMAIL.code)
                    errorArrayEmail.push(INVALID_EMAIL.code)
                else if (error.code === TOO_MANY_REQUESTS.code) {
                    dispatch(changeModalMessage(TOO_MANY_REQUESTS.message[`${language}`]))
                    dispatch(invertIsModalState())
                } else if (error.code === NETWORK_REQUEST_FAILED.code) {
                    dispatch(changeModalMessage(NETWORK_REQUEST_FAILED.message[`${language}`]))
                    dispatch(invertIsModalState())
                } else if (error.code === USER_NOT_FOUND.code) {
                    dispatch(changeModalMessage(USER_NOT_FOUND.message[`${language}`]))
                    dispatch(invertIsModalState())
                } else {
                    dispatch(changeModalMessage(error.message))
                    dispatch(invertIsModalState())
                }
                setErrorEmailState(errorArrayEmail)
                dispatch(setIsLoadingFalse())
            });
    }

    return (
        <>
            <View style={styles.inputCard}>
                <TextInputWithErrorMessage
                    errorState={(errorEmailState) ? getEmailError(errorEmailState) : undefined}
                    setInputState={setEmail}
                    inputState={email}
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
                    title={LOGIN_PAGE_LABEL[`${language}`]}
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
