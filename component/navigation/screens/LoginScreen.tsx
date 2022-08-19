import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {vh, vw} from "../../../functions/dimentions";
import {
    COLOR_BACKGROUND,
    COLOR_CARD_BACKGROUND,
    COLOR_HEADER,
    COLOR_INCORRECT_FIELD_INPUT,
} from "../../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import StyledButton from "../../layout/StyledButton";
import {app, createUserInDb, CreationData, getUser, isUsernameUsed} from "../../../functions/firebase";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../constants/hooks";
import {activeUser, User} from "../../../reducers/user/userReducer";
import FilterButton from "../../home/filter/FilterButton";
import {
    EMAIL_ALREADY_IN_USE,
    INVALID_EMAIL,
    NETWORK_REQUEST_FAILED,
    TOO_MANY_REQUESTS,
    USER_NOT_FOUND,
    WEAK_PASSWORD,
    WRONG_PASSWORD
} from "../../../constants/error_codes_firebase";
import {
    EMAIL_MISSING, EMAIL_NOT_VERIFIED,
    PASSWORD_MISSING,
    PASSWORDS_NOT_MATCHING,
    REPEAT_PASSWORD_MISSING, USERNAME_ALREADY_USED,
    USERNAME_MISSING
} from "../../../constants/error_codes";
import CardLayout from "../../layout/CardLayout";
import AppBackground from "../../layout/AppBackground";
import {CREATE_ACCOUNT} from "../../../constants/const_vars";
import {
    ACCOUNT_CREATED_VERIFY_EMAIL,
    CREATE_ACCOUNT_LABEL,
    EMAIL_LABEL,
    FINISH_ACCOUNT_CREATION_LABEL,
    LOGIN_LABEL,
    PASSWORD_LABEL,
    REPEAT_PASSWORD_LABEL,
    USERNAME_LABEL
} from "../../../constants/labels";
import {changeLanguage} from "../../../reducers/user/languageReducer";
import LoadingScreen from "../../layout/LoadingScreen";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../reducers/booleans/isLoadingReducer";
import {sendEmailVerification} from "@firebase/auth";
import Modal from "../../layout/Modal";
import {invertIsModalState} from "../../../reducers/booleans/isModalReducer";
import {changeModalMessage} from "../../../reducers/general/modalMessageReducer";
import {
    getEmailError,
    getPasswordError,
    getRepeatPasswordError,
    getUsernameError
} from "../../../functions/getErrorFunctionsInputs";

export default function LoginScreen() {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(['']);
    const [errorStateEmail, setErrorStateEmail] = useState(['']);
    const [errorStateUsername, setErrorStateUsername] = useState(['']);
    const [errorStatePassword, setErrorStatePassword] = useState(['']);
    const [errorStateRepeatPassword, setErrorStateRepeatPassword] = useState(['']);
    const language: any = state.language

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
        if ((!errorArrayEmail) ||
            (!errorArrayPassword)) {
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
                    userDb = {
                        userID: user.user.uid,
                        email: resultUser.email,
                        username: resultUser.username,
                        languageSetting: resultUser.languageSetting,
                    }
                    dispatch(activeUser(userDb))
                    dispatch(changeLanguage(resultUser.languageSetting))
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
            }
            else if (error.code === NETWORK_REQUEST_FAILED.code) {
                dispatch(changeModalMessage(NETWORK_REQUEST_FAILED.message[`${language}`]))
                dispatch(invertIsModalState())
            }
            else if (error.code === INVALID_EMAIL.code)
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
        if ((!errorArrayUsername) ||
            (!errorArrayEmail) ||
            (!errorArrayPassword) ||
            (!errorArrayRepeatPassword)) {
            setErrorStateUsername(errorArrayUsername)
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            setErrorStateRepeatPassword(errorArrayRepeatPassword)
            dispatch(setIsLoadingFalse())
            return
        }
        createUserWithEmailAndPassword(auth, email, password).then( async (user) => {
            await updateProfile(user.user, {displayName: username}).then(async () => {
                await sendEmailVerification(user.user).then( async () => {
                    if (!user.user.displayName) {
                        dispatch(changeModalMessage(USERNAME_MISSING.message[`${language}`]))
                        dispatch(invertIsModalState())
                        dispatch(setIsLoadingFalse())
                        return
                    }
                    if (!user.user.email) {
                        dispatch(changeModalMessage(EMAIL_MISSING.message[`${language}`]))
                        dispatch(invertIsModalState())
                        dispatch(setIsLoadingFalse())
                        return
                    }
                    const userDb: CreationData = {
                        userID: user.user.uid,
                        username: user.user.displayName,
                        email: user.user.email,
                        languageSetting: state.language
                    }
                    // dispatch(activeUser(userDb))
                    await createUserInDb(userDb)
                    dispatch(setIsLoadingFalse())
                    auth.signOut().then(() => {
                        dispatch(setIsLoadingFalse())
                    }).catch(error => {
                        alert(error.message)
                    })
                    dispatch(changeModalMessage(ACCOUNT_CREATED_VERIFY_EMAIL[`${language}`]))
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
                dispatch(changeModalMessage(TOO_MANY_REQUESTS.message[`${language}`]))
                dispatch(invertIsModalState())
            }
            else if (error.code === NETWORK_REQUEST_FAILED.code) {
                dispatch(changeModalMessage(NETWORK_REQUEST_FAILED.message[`${language}`]))
                dispatch(invertIsModalState())
            }
            else {
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
        setErrorStateUsername([])
        setErrorStateEmail([])
        setErrorStatePassword([])
        setErrorStateRepeatPassword([])
        if (isCreatingAccount.includes(CREATE_ACCOUNT_LABEL.ENG)) {
            setIsCreatingAccount([''])
            return
        }
        setIsCreatingAccount([CREATE_ACCOUNT_LABEL.ENG])
    }

    return (
        <AppBackground>
            <View style={styles.loginScreen}>
                <Image style={{position: 'absolute', height: '100%', width: '100%'}}
                       source={require('../../../assets/images/adaptive_background.png')}/>
                <CardLayout width={vw(0.7)}>
                    <View style={[styles.inputCard,
                        (isCreatingAccount.includes(CREATE_ACCOUNT) && !!getRepeatPasswordError(errorStateRepeatPassword) ||
                            !isCreatingAccount.includes(CREATE_ACCOUNT) && !!getPasswordError(errorStatePassword))
                            ? {paddingBottom: PADDING} : null]}>
                        {(isCreatingAccount.includes(CREATE_ACCOUNT)) ? (
                            <>
                                <TextInput
                                    style={[styles.input,
                                        (getUsernameError(errorStateUsername)) ? {backgroundColor: COLOR_INCORRECT_FIELD_INPUT} : {backgroundColor: COLOR_CARD_BACKGROUND}]}
                                    onChangeText={input => {
                                        setUsername(input.trim())
                                    }}
                                    placeholder={USERNAME_LABEL[`${language}`]}
                                    value={username}
                                    selectTextOnFocus={true}/>
                                {getUsernameError(errorStateUsername) ? (
                                    <Text
                                        style={styles.wrongInputMessage}>{getUsernameError(errorStateUsername)?.message[`${language}`]}</Text>
                                ) : null}
                            </>
                        ) : null}
                        <TextInput
                            style={[styles.input,
                                (getEmailError(errorStateEmail)) ? {backgroundColor: COLOR_INCORRECT_FIELD_INPUT} : {backgroundColor: COLOR_CARD_BACKGROUND}]}
                            onChangeText={input => {
                                setEmail(input.trim())
                            }}
                            placeholder={EMAIL_LABEL[`${language}`]}
                            value={email}
                            selectTextOnFocus={true}/>
                        {getEmailError(errorStateEmail) ? (
                            <Text style={styles.wrongInputMessage}>{getEmailError(errorStateEmail)?.message[`${language}`]}</Text>
                        ) : null}
                        <TextInput
                            style={[styles.input,
                                {backgroundColor: (getPasswordError(errorStatePassword)) ? COLOR_INCORRECT_FIELD_INPUT : COLOR_CARD_BACKGROUND},
                                // {
                                //     backgroundColor: (
                                //         password === repeatPassword
                                //         && (password !== '' || repeatPassword !== '')
                                //         && password.length > 5
                                //         && repeatPassword.length > 5
                                //     ) ? COLOR_CORRECT_FIELD_INPUT : COLOR_CARD_BACKGROUND
                                // }
                            ]}
                            onChangeText={input => {
                                setPassword(input.trim())
                            }}
                            placeholder={PASSWORD_LABEL[`${language}`]}
                            secureTextEntry={true}
                            selectTextOnFocus={true}/>
                        {getPasswordError(errorStatePassword) ? (
                            <Text style={styles.wrongInputMessage}>{getPasswordError(errorStatePassword)?.message[`${language}`]}</Text>
                        ) : null}
                        {(isCreatingAccount.includes(CREATE_ACCOUNT)) ? (
                            <>
                                <TextInput
                                    style={[styles.input,
                                        {backgroundColor: (getRepeatPasswordError(errorStateRepeatPassword)) ? COLOR_INCORRECT_FIELD_INPUT : COLOR_CARD_BACKGROUND},
                                        // {
                                        //     backgroundColor: (
                                        //         password === repeatPassword
                                        //         && (password !== '' || repeatPassword !== '')
                                        //         && password.length > 5
                                        //         && repeatPassword.length > 5
                                        //     ) ? COLOR_CORRECT_FIELD_INPUT : COLOR_CARD_BACKGROUND
                                        // }
                                    ]}
                                    onChangeText={input => {
                                        setRepeatPassword(input.trim())
                                    }}
                                    placeholder={REPEAT_PASSWORD_LABEL[`${language}`]}
                                    secureTextEntry={true}
                                    selectTextOnFocus={true}/>
                                {getRepeatPasswordError(errorStateRepeatPassword) ? (
                                    <Text
                                        style={styles.wrongInputMessage}>{getRepeatPasswordError(errorStateRepeatPassword)?.message[`${language}`]}</Text>
                                ) : null}
                            </>
                        ) : null}
                    </View>
                    <StyledButton width={'100%'}
                                  onPress={(isCreatingAccount.includes(CREATE_ACCOUNT)) ? onCreatAccountHandler : onLoginHandler}
                                  title={(isCreatingAccount.includes(CREATE_ACCOUNT)) ? FINISH_ACCOUNT_CREATION_LABEL[`${language}`] : LOGIN_LABEL[`${language}`]}/>
                    <FilterButton
                        title={CREATE_ACCOUNT_LABEL[`${language}`]}
                        titleENG={CREATE_ACCOUNT_LABEL.ENG}
                        colorActive={COLOR_HEADER}
                        colorInactive={COLOR_BACKGROUND}
                        onClick={onCreateAccountButtonClickHandler}
                        state={isCreatingAccount}
                        padding={PADDING / 2}
                        margin={MARGIN / 2}
                        width={'100%'}/>
                </CardLayout>
            </View>
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
            {state.isModal ? (
                <Modal message={state.modalMessage} />
            ): null}
        </AppBackground>
    )
}

const styles = StyleSheet.create({
    loginScreen: {
        backgroundColor: COLOR_BACKGROUND,
        height: vh(1),
        alignItems: "center",
        justifyContent: 'center'
    },
    loginCard: {
        width: vw(0.7),
        backgroundColor: COLOR_CARD_BACKGROUND,
        padding: PADDING,
        borderRadius: BORDER_RADIUS / 2,
        alignItems: "center",
        justifyContent: 'center',
    },
    input: {
        // backgroundColor: COLOR_CARD_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
        padding: PADDING,
        margin: MARGIN
    },
    inputCard: {
        width: '100%',
        marginBottom: MARGIN / 2,
        backgroundColor: COLOR_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
    },
    buttonCard: {
        flex: 2,
        width: '100%',
    },
    wrongInputMessage: {
        maxWidth: vw(0.7) - MARGIN - PADDING,
        color: COLOR_INCORRECT_FIELD_INPUT,
        marginLeft: MARGIN,
        paddingLeft: PADDING,
        marginRight: MARGIN,
        paddingRight: PADDING
    }
});
