import {ImageBackground, StyleSheet, TextInput, View, Text} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {
    COLOR_BACKGROUND, COLOR_CARD_BACKGROUND,
    COLOR_HEADER,
    COLOR_INCORRECT_FIELD_INPUT,
} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import StyledButton from "../layout/StyledButton";
import {app} from "../../functions/firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {activeUser} from "../../reducers/user/userReducer";
import FilterButton from "../home/filter/FilterButton";
import {
    EMAIL_ALREADY_IN_USE,
    INVALID_EMAIL,
    TOO_MANY_REQUESTS,
    USER_NOT_FOUND,
    WEAK_PASSWORD,
    WRONG_PASSWORD
} from "../../constants/error_codes_firebase";
import {
    EMAIL_MISSING,
    PASSWORD_MISSING,
    PASSWORDS_NOT_MATCHING,
    REPEAT_PASSWORD_MISSING,
    USERNAME_MISSING
} from "../../constants/error_codes";
import {setHomeScreen} from "../../reducers/currentAppScreenReducer";
import CardLayout from "../layout/CardLayout";

export default function LoginScreen() {
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

    const auth = getAuth(app)

    const onLoginHandler = () => {
        let errorArrayEmail: string[] = []
        let errorArrayPassword: string[] = []
        if (email.trim() === '') {
            setEmail('')
            errorArrayEmail.push(EMAIL_MISSING.code)
        }
        if (password === '') {
            errorArrayPassword.push(PASSWORD_MISSING.code)
        }
        if ((errorArrayEmail.length !== 0) ||
            (errorArrayPassword.length !== 0)) {
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            return
        }
        signInWithEmailAndPassword(auth, email, password).then(user => {
            dispatch(activeUser({
                name: user.user.displayName,
                email: user.user.email,
            }))
            dispatch(setHomeScreen())
        }).catch(error => {
            if (error.code === WRONG_PASSWORD.code)
                errorArrayPassword.push(WRONG_PASSWORD.code)
            else if (error.code === USER_NOT_FOUND.code)
                errorArrayEmail.push(USER_NOT_FOUND.code)
            else if (error.code === TOO_MANY_REQUESTS.code)
                alert(TOO_MANY_REQUESTS.message)
            else if (error.code === INVALID_EMAIL.code)
                errorArrayEmail.push(INVALID_EMAIL.code)
            else {
                alert(error.code)
            }
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
        })
    }

    const onCreatAccountHandler = () => {
        let errorArrayUsername: string[] = []
        let errorArrayEmail: string[] = []
        let errorArrayPassword: string[] = []
        let errorArrayRepeatPassword: string[] = []
        if (username.trim() === '') {
            setUsername('')
            errorArrayUsername.push(USERNAME_MISSING.code)
        }
        if (email.trim() === '') {
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
        if ((errorArrayUsername.length !== 0) ||
            (errorArrayEmail.length !== 0) ||
            (errorArrayPassword.length !== 0) ||
            (errorArrayRepeatPassword.length !== 0)) {
            setErrorStateUsername(errorArrayUsername)
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            setErrorStateRepeatPassword(errorArrayRepeatPassword)
            return
        }

        createUserWithEmailAndPassword(auth, email, password).then(user => {
            updateProfile(user.user, {displayName: username}).then(() => {
                dispatch(activeUser({
                    name: user.user.displayName,
                    email: user.user.email,
                }))
            }).catch(error => {
                alert(error.message)
                return
            })
            dispatch(setHomeScreen())
        }).catch(error => {
            if (error.code === WEAK_PASSWORD.code) {
                errorArrayPassword.push(WEAK_PASSWORD.code)
                errorArrayRepeatPassword.push(WEAK_PASSWORD.code)
            } else if (error.code === INVALID_EMAIL.code)
                errorArrayEmail.push(INVALID_EMAIL.code)
            else if (error.code === EMAIL_ALREADY_IN_USE.code)
                errorArrayEmail.push(EMAIL_ALREADY_IN_USE.code)
            else
                alert(error.message)
            setErrorStateUsername(errorArrayUsername)
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            setErrorStateRepeatPassword(errorArrayRepeatPassword)
        })
    }

    const onCreateAccountButtonClickHandler = () => {
        setErrorStateUsername([])
        setErrorStateEmail([])
        setErrorStatePassword([])
        setErrorStateRepeatPassword([])
        if (isCreatingAccount.includes('Create Account')) {
            setIsCreatingAccount([''])
            return
        }
        setIsCreatingAccount(['Create Account'])
    }

    const getUsernameError = () => {
        if (errorStateUsername.includes(USERNAME_MISSING.code))
            return USERNAME_MISSING
        return undefined;
    }

    const getEmailError = () => {
        if (errorStateEmail.includes(EMAIL_MISSING.code))
            return EMAIL_MISSING
        if (errorStateEmail.includes(INVALID_EMAIL.code))
            return INVALID_EMAIL
        if (errorStateEmail.includes(EMAIL_ALREADY_IN_USE.code))
            return EMAIL_ALREADY_IN_USE
        if (errorStateEmail.includes(USER_NOT_FOUND.code))
            return USER_NOT_FOUND
        return undefined;
    }

    const getPasswordError = () => {
        if (errorStatePassword.includes(PASSWORD_MISSING.code))
            return PASSWORD_MISSING
        if (errorStatePassword.includes(WRONG_PASSWORD.code))
            return WRONG_PASSWORD
        if (errorStatePassword.includes(PASSWORDS_NOT_MATCHING.code))
            return PASSWORDS_NOT_MATCHING
        if (errorStatePassword.includes(WEAK_PASSWORD.code))
            return WEAK_PASSWORD
        return undefined;
    }

    const getRepeatPasswordError = () => {
        if (errorStateRepeatPassword.includes(REPEAT_PASSWORD_MISSING.code))
            return REPEAT_PASSWORD_MISSING
        if (errorStateRepeatPassword.includes(PASSWORDS_NOT_MATCHING.code))
            return PASSWORDS_NOT_MATCHING
        if (errorStateRepeatPassword.includes(WEAK_PASSWORD.code))
            return WEAK_PASSWORD
        return undefined;
    }

    return (
        <View style={styles.loginScreen}>
            <ImageBackground style={{position: 'absolute', height: '100%', width: '100%'}}
                             source={{uri: require('../../assets/images/adaptive_background.png')}}/>
            <CardLayout width={vw(0.7)}>
                <View style={[styles.inputCard,
                    (isCreatingAccount.includes('Create Account') && !!getRepeatPasswordError() ||
                        !isCreatingAccount.includes('Create Account') && !!getPasswordError())
                    && {paddingBottom: PADDING}]}>
                    {(isCreatingAccount.includes('Create Account')) && (
                        <>
                            <TextInput
                                style={[styles.input,
                                    (getUsernameError()) && {backgroundColor: COLOR_INCORRECT_FIELD_INPUT}]}
                                onChangeText={input => {
                                    setUsername(input)
                                }}
                                placeholder={'Username'}
                                value={username}/>
                            {getUsernameError() && (
                                <Text style={styles.wrongInputMessage}>{getUsernameError()?.message}</Text>
                            )}
                        </>
                    )}
                    <TextInput
                        style={[styles.input,
                            (getEmailError()) && {backgroundColor: COLOR_INCORRECT_FIELD_INPUT}]}
                        onChangeText={input => {
                            setEmail(input)
                        }}
                        placeholder={'Email'}
                        value={email}/>
                    {getEmailError() && (
                        <Text style={styles.wrongInputMessage}>{getEmailError()?.message}</Text>
                    )}
                    <TextInput
                        style={[styles.input,
                            (getPasswordError()) && {backgroundColor: COLOR_INCORRECT_FIELD_INPUT}]}
                        onChangeText={input => {
                            setPassword(input)
                        }}
                        placeholder={'Password'}
                        secureTextEntry={true}/>
                    {getPasswordError() && (
                        <Text style={styles.wrongInputMessage}>{getPasswordError()?.message}</Text>
                    )}
                    {(isCreatingAccount.includes('Create Account')) && (
                        <>
                            <TextInput
                                style={[styles.input, (getRepeatPasswordError())
                                && {backgroundColor: COLOR_INCORRECT_FIELD_INPUT}]}
                                onChangeText={input => {
                                    setRepeatPassword(input)
                                }}
                                placeholder={'Repeat Password'}
                                secureTextEntry={true}/>
                            {getRepeatPasswordError() && (
                                <Text style={styles.wrongInputMessage}>{getRepeatPasswordError()?.message}</Text>
                            )}
                        </>
                    )}
                </View>
                <StyledButton width={'100%'}
                              onPress={(isCreatingAccount.includes('Create Account')) ? onCreatAccountHandler : onLoginHandler}
                              title={(isCreatingAccount.includes('Create Account')) ? 'Finish Account Creation' : 'Login'}/>
                <FilterButton
                    title={'Create Account'}
                    colorActive={COLOR_HEADER}
                    colorInactive={COLOR_BACKGROUND}
                    onClick={onCreateAccountButtonClickHandler}
                    state={isCreatingAccount}
                    padding={PADDING / 2}
                    margin={MARGIN / 2}
                    width={'100%'}/>
            </CardLayout>
        </View>
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
        backgroundColor: COLOR_CARD_BACKGROUND,
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
        maxWidth: vw(0.7)-MARGIN-PADDING,
        color: COLOR_INCORRECT_FIELD_INPUT,
        marginLeft: MARGIN,
        paddingLeft: PADDING,
        marginRight: MARGIN,
        paddingRight: PADDING
    }
});
