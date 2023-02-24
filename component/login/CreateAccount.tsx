import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {StyleSheet, View} from "react-native";
import TextInputWithErrorMessage from "../layout/TextInputWithErrorMessage";
import {
    getEmailError,
    getPasswordError,
    getRepeatPasswordError,
    getUsernameError
} from "../../functions/getErrorFunctionsInputs";
import {
    CREATE_ACCOUNT_LABEL,
} from "../../constants/const_vars";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import StyledButton from "../layout/StyledButton";
import FilterButton from "../home/filter/FilterButton";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../constants/color_styles";
import React, {useState} from "react";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import {app, createUserInDb, CreationData, isUsernameUsed} from "../../functions/firebase";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../reducers/general/booleans/isLoadingReducer";
import {
    EMAIL_MISSING,
    PASSWORD_MISSING, PASSWORDS_NOT_MATCHING,
    REPEAT_PASSWORD_MISSING,
    USERNAME_ALREADY_USED,
    USERNAME_MISSING
} from "../../constants/error_codes";
import {sendEmailVerification} from "@firebase/auth";
import {changeModalMessage} from "../../reducers/general/modalMessageReducer";
import {invertIsModalState} from "../../reducers/general/booleans/isModalReducer";
import {
    EMAIL_ALREADY_IN_USE,
    INVALID_EMAIL, NETWORK_REQUEST_FAILED,
    TOO_MANY_REQUESTS,
    WEAK_PASSWORD
} from "../../constants/error_codes_firebase";
import {login} from "../../reducers/login/loginStateReducer";
import ForgotPasswordButton from "./ForgotPasswordButton";
import {invertIsCreatingAccount} from "../../reducers/login/isCreatingAccountReducer";
import {Language} from "../../constants/types";

export default function CreateAccount({}: CreateAccountProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [errorStateUsername, setErrorStateUsername] = useState<string[] | undefined>(undefined);
    const [errorStateEmail, setErrorStateEmail] = useState<string[] | undefined>(undefined);
    const [errorStatePassword, setErrorStatePassword] = useState<string[] | undefined>(undefined);
    const [errorStateRepeatPassword, setErrorStateRepeatPassword] = useState<string[] | undefined>(undefined);
    const language: Language = state.language

    const auth = getAuth(app)

    const onCreatAccountHandler = async () => {
        dispatch(setIsLoadingTrue())
        let errorArrayUsername: string[] = []
        let errorArrayEmail: string[] = []
        let errorArrayPassword: string[] = []
        let errorArrayRepeatPassword: string[] = []
        if (username === '') {
            setUsername('')
            errorArrayUsername.push(USERNAME_MISSING.code)
        }
        await isUsernameUsed(username.toLowerCase()).then(result => {
            if (result)
                errorArrayUsername.push(USERNAME_ALREADY_USED.code)
        })
        if (email === '') {
            setEmail('')
            errorArrayEmail.push(EMAIL_MISSING.code)
        }
        if (password === '') {
            errorArrayPassword.push(PASSWORD_MISSING.code)
        }
        if (repeatPassword === '') {
            errorArrayRepeatPassword.push(REPEAT_PASSWORD_MISSING.code)
        }
        if (repeatPassword !== password) {
            errorArrayPassword.push(PASSWORDS_NOT_MATCHING.code)
            errorArrayRepeatPassword.push(PASSWORDS_NOT_MATCHING.code)
        }
        if ((errorArrayUsername.length > 0) ||
            (errorArrayEmail.length > 0) ||
            (errorArrayPassword.length > 0) ||
            (errorArrayRepeatPassword.length > 0)) {
            setErrorStateUsername(errorArrayUsername)
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            setErrorStateRepeatPassword(errorArrayRepeatPassword)
            dispatch(setIsLoadingFalse())
            return
        }
        createUserWithEmailAndPassword(auth, email, password).then(async (user) => {
            await updateProfile(user.user, {displayName: username}).then(async () => {
                await sendEmailVerification(user.user).then(async () => {
                    if (!user.user.displayName) {
                        dispatch(changeModalMessage(language.labels.ERROR_CODES.USERNAME_MISSING))
                        dispatch(invertIsModalState())
                        dispatch(setIsLoadingFalse())
                        return
                    }
                    if (!user.user.email) {
                        dispatch(changeModalMessage(language.labels.ERROR_CODES.EMAIL_MISSING))
                        dispatch(invertIsModalState())
                        dispatch(setIsLoadingFalse())
                        return
                    }
                    const userDb: CreationData = {
                        userID: user.user.uid,
                        username: user.user.displayName,
                        email: user.user.email,
                        languageSetting: state.language.langKey,
                        favorites: []
                    }
                    await createUserInDb(userDb)
                    dispatch(setIsLoadingFalse())
                    auth.signOut().then(() => {
                        dispatch(setIsLoadingFalse())
                    }).catch(error => {
                        alert(error.message)
                    })
                    dispatch(changeModalMessage(language.labels.ACCOUNT_CREATED_VERIFY_EMAIL))
                    dispatch(invertIsModalState())
                    onCreateAccountButtonClickHandler()
                }).catch(error => {
                    console.log(error.message)
                    alert(error.message)
                })

            }).catch(error => {
                alert(error.message)
                dispatch(setIsLoadingFalse())
                return
            })
        }).catch(error => {
            if (error.code === WEAK_PASSWORD.code) {
                errorArrayPassword.push(WEAK_PASSWORD.code)
                errorArrayRepeatPassword.push(WEAK_PASSWORD.code)
            } else if (error.code === INVALID_EMAIL.code)
                errorArrayEmail.push(INVALID_EMAIL.code)
            else if (error.code === EMAIL_ALREADY_IN_USE.code)
                errorArrayEmail.push(EMAIL_ALREADY_IN_USE.code)
            else if (error.code === TOO_MANY_REQUESTS.code) {
                dispatch(changeModalMessage(language.labels.ERROR_CODES.TOO_MANY_REQUESTS))
                dispatch(invertIsModalState())
            } else if (error.code === NETWORK_REQUEST_FAILED.code) {
                dispatch(changeModalMessage(language.labels.ERROR_CODES.NETWORK_REQUEST_FAILED))
                dispatch(invertIsModalState())
            } else {
                dispatch(changeModalMessage(error.message))
                dispatch(invertIsModalState())
            }
            setErrorStateUsername(errorArrayUsername)
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            setErrorStateRepeatPassword(errorArrayRepeatPassword)
            dispatch(setIsLoadingFalse())
        })
    }

    const onCreateAccountButtonClickHandler = () => {
        setErrorStateUsername(undefined)
        setErrorStateEmail(undefined)
        setErrorStatePassword(undefined)
        setErrorStateRepeatPassword(undefined)
        dispatch(invertIsCreatingAccount())
        dispatch(login())
    }

    return (
        <>
            <View style={styles.inputCard}>
                <TextInputWithErrorMessage
                    errorState={errorStateUsername ? getUsernameError(errorStateUsername) : undefined}
                    setInputState={setUsername}
                    inputState={username}
                    placeholderLabel={language.labels.USERNAME_LABEL}/>
                <TextInputWithErrorMessage
                    errorState={errorStateEmail ? getEmailError(errorStateEmail) : undefined}
                    setInputState={setEmail}
                    inputState={email}
                    placeholderLabel={language.labels.EMAIL_LABEL}/>
                <TextInputWithErrorMessage
                    errorState={errorStatePassword ? getPasswordError(errorStatePassword) : undefined}
                    setInputState={setPassword}
                    inputState={password}
                    placeholderLabel={language.labels.PASSWORD_LABEL}
                    isPassword={true}                />
                <TextInputWithErrorMessage
                    errorState={errorStateRepeatPassword ? getRepeatPasswordError(errorStateRepeatPassword) : undefined}
                    setInputState={setRepeatPassword}
                    inputState={repeatPassword}
                    placeholderLabel={language.labels.REPEAT_PASSWORD_LABEL}
                    isPassword={true}/>
            </View>
            <View style={{marginVertical: MARGIN / 2}}>
                <StyledButton
                    padding={PADDING}
                    onPress={onCreatAccountHandler}
                    title={language.labels.FINISH_ACCOUNT_CREATION_LABEL}
                />
            </View>
            <View style={{marginVertical: MARGIN / 2}}>
                <FilterButton
                    isIcon={false}
                    padding={PADDING}
                    title={language.labels.CREATE_ACCOUNT_LABEL}
                    //TODO change dependency from labels in filter button
                    titleENG={CREATE_ACCOUNT_LABEL}
                    colorActive={COLOR_HEADER}
                    colorInactive={COLOR_BACKGROUND}
                    onClick={onCreateAccountButtonClickHandler}
                    state={state.isCreatingAccount}/>
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

export type CreateAccountProps = {

}
