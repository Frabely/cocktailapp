import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {StyleSheet, View} from "react-native";
import TextInputWithErrorMessage from "../layout/TextInputWithErrorMessage";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../constants/color_styles";
import FilterButton from "../home/filter/FilterButton";
import {
    CREATE_ACCOUNT_LABEL,
    EMAIL_LABEL,
    LOGIN_LABEL,
    PASSWORD_LABEL
} from "../../constants/labels";
import React, {useState} from "react";
import StyledButton from "../layout/StyledButton";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../reducers/booleans/isLoadingReducer";
import {EMAIL_MISSING, EMAIL_NOT_VERIFIED, PASSWORD_MISSING} from "../../constants/error_codes";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {changeModalMessage} from "../../reducers/general/modalMessageReducer";
import {invertIsModalState} from "../../reducers/booleans/isModalReducer";
import {activeUser, User} from "../../reducers/user/userReducer";
import {app, getFavoritesList, getUser} from "../../functions/firebase";
import {changeLanguage} from "../../reducers/user/languageReducer";
import {
    INVALID_EMAIL,
    NETWORK_REQUEST_FAILED,
    TOO_MANY_REQUESTS,
    USER_NOT_FOUND,
    WRONG_PASSWORD
} from "../../constants/error_codes_firebase";
import {getEmailError, getPasswordError} from "../../functions/getErrorFunctionsInputs";
import {createAccount} from "../../reducers/login/loginStateReducer";
import ForgotPasswordButton from "./ForgotPasswordButton";
import {invertIsCreatingAccount} from "../../reducers/login/isCreatingAccountReducer";
import {fetchFavoriteDataSetAsArray} from "../../functions/filterFunctions";
import {Cocktail} from "../../constants/types";

export default function Login({}: LoginProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorStateEmail, setErrorStateEmail] = useState<string[] | undefined>(undefined);
    const [errorStatePassword, setErrorStatePassword] = useState<string[] | undefined>(undefined);
    const language: string = state.language

    const auth = getAuth(app)

    const onLoginHandler = async () => {
        dispatch(setIsLoadingTrue())
        let errorArrayEmail: string[] = []
        let errorArrayPassword: string[] = []
        if (email === '') {
            setEmail('')
            errorArrayEmail.push(EMAIL_MISSING.code)
        }
        if (password === '') {
            errorArrayPassword.push(PASSWORD_MISSING.code)
        }
        if ((errorArrayEmail.length > 0) ||
            (errorArrayPassword.length > 0)) {
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            dispatch(setIsLoadingFalse())
            return
        }
        signInWithEmailAndPassword(auth, email, password).then(async user => {
            if (!user.user.emailVerified) {
                errorArrayEmail.push(EMAIL_NOT_VERIFIED.code)
                dispatch(changeModalMessage(EMAIL_NOT_VERIFIED.message[`${language}`]))
                dispatch(invertIsModalState())
                auth.signOut().then(() => {
                    dispatch(setIsLoadingFalse())
                }).catch(error => {
                    alert(error.message)
                })
                return
            }
            let userDb: User
            await getUser(user.user.uid).then(resultUser => {
                if (resultUser) {
                    getFavoritesList(user.user.uid).then((stringArray: string[] |undefined) => {
                        if (stringArray) {
                            fetchFavoriteDataSetAsArray(stringArray).then((favoriteArray: Cocktail[] | undefined) => {
                                if (favoriteArray) {
                                    userDb = {
                                        userID: user.user.uid,
                                        email: resultUser.email,
                                        username: resultUser.username,
                                        languageSetting: resultUser.languageSetting,
                                        favorites: favoriteArray
                                    }
                                    dispatch(activeUser(userDb))
                                    dispatch(changeLanguage(resultUser.languageSetting))
                                }
                            }).catch(error => {
                                console.log(error.message)
                                dispatch(changeModalMessage(error.message))
                                dispatch(invertIsModalState())
                            })
                        }
                    }).catch(error => {
                        console.log(error.message)
                        dispatch(changeModalMessage(error.message))
                        dispatch(invertIsModalState())
                    })
                } else {
                    dispatch(changeModalMessage(USER_NOT_FOUND.message[`${language}`]))
                    dispatch(invertIsModalState())
                }
                dispatch(setIsLoadingFalse())
            })
        }).catch(error => {
            if (error.code === WRONG_PASSWORD.code)
                errorArrayPassword.push(WRONG_PASSWORD.code)
            else if (error.code === USER_NOT_FOUND.code)
                errorArrayEmail.push(USER_NOT_FOUND.code)
            else if (error.code === TOO_MANY_REQUESTS.code) {
                dispatch(changeModalMessage(TOO_MANY_REQUESTS.message[`${language}`]))
                dispatch(invertIsModalState())
            } else if (error.code === NETWORK_REQUEST_FAILED.code) {
                dispatch(changeModalMessage(NETWORK_REQUEST_FAILED.message[`${language}`]))
                dispatch(invertIsModalState())
            } else if (error.code === INVALID_EMAIL.code)
                errorArrayEmail.push(INVALID_EMAIL.code)
            else {
                dispatch(changeModalMessage(error.message))
                dispatch(invertIsModalState())
            }
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            dispatch(setIsLoadingFalse())
        })
    }

    const onCreateAccountButtonClickHandler = () => {
        setErrorStateEmail(undefined)
        setErrorStatePassword(undefined)
        dispatch(invertIsCreatingAccount())
        dispatch(createAccount())
    }

    return (
        <>
            <View style={styles.inputCard}>
                <TextInputWithErrorMessage
                    errorState={errorStateEmail ? getEmailError(errorStateEmail) : undefined}
                    setInputState={setEmail}
                    inputState={email}
                    placeholderLabel={EMAIL_LABEL[`${language}`]}/>
                <TextInputWithErrorMessage
                    errorState={errorStatePassword ? getPasswordError(errorStatePassword) : undefined}
                    setInputState={setPassword}
                    inputState={password}
                    placeholderLabel={PASSWORD_LABEL[`${language}`]}
                    isPassword={true}/>
            </View>
            <View style={{marginVertical: MARGIN / 2}}>
                <StyledButton
                    padding={PADDING}
                    onPress={onLoginHandler}
                    title={LOGIN_LABEL[`${language}`]}
                />
            </View>
            <View style={{marginVertical: MARGIN / 2}}>
                <FilterButton
                    padding={PADDING}
                    title={CREATE_ACCOUNT_LABEL[`${language}`]}
                    titleENG={CREATE_ACCOUNT_LABEL.ENG}
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

export type LoginProps = {}
