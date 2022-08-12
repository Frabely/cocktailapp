import {ImageBackground, StyleSheet, TextInput, View} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {
    COLOR_BACKGROUND,
    COLOR_HEADER,
    COLOR_INCORRECT_FIELD_INPUT,
    COLOR_LABEL_BACKGROUND
} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import StyledButton from "../StyledButton";
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
import FilterButton from "../home/menu/filter/FilterButton";
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
import data from "../../constants/dummyData3";

export default function LoginScreen() {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const auth = getAuth(app)
    const [isCreatingAccount, setIsCreatingAccount] = useState(['']);

    const [errorState, setErrorState] = useState(['']);

    const onLoginHandler = () => {
        let errorArray: string[] = []
        if (email.trim() === '') {
            setEmail('')
            errorArray.push(EMAIL_MISSING.code)
        }
        if (password === '') {
            errorArray.push(PASSWORD_MISSING.code)
        }
        if (errorArray.length !== 0) {
            setErrorState(errorArray)
            return
        }
        signInWithEmailAndPassword(auth, email, password).then(user => {
            dispatch(activeUser({
                name: user.user.displayName,
                email: user.user.email,
            }))
        }).catch(error => {
            console.log(error.code)
            if (error.code === WRONG_PASSWORD.code)
                errorArray.push(WRONG_PASSWORD.code)
            else if (error.code === USER_NOT_FOUND.code)
                errorArray.push(USER_NOT_FOUND.code)
            else if (error.code === TOO_MANY_REQUESTS.code)
                errorArray.push(TOO_MANY_REQUESTS.code)
            else if (error.code === INVALID_EMAIL.code)
                errorArray.push(INVALID_EMAIL.code)
            else {
                alert(error.code)
            }
            setErrorState(errorArray)
        })
    }

    const onCreatAccountHandler = () => {
        let errorArray: string[] = []
        if (username.trim() === '') {
            setUsername('')
            errorArray.push(USERNAME_MISSING.code)
        }
        if (email.trim() === '') {
            setEmail('')
            errorArray.push(EMAIL_MISSING.code)
        }
        if (password === '') {
            errorArray.push(PASSWORD_MISSING.code)
        }
        if (repeatPassword === '') {
            errorArray.push(REPEAT_PASSWORD_MISSING.code)
        }
        if (repeatPassword !== password) {
            errorArray.push(PASSWORDS_NOT_MATCHING.code)
        }
        if (errorArray.length !== 0) {
            setErrorState(errorArray)
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
        }).catch(error => {
            if (error.code === WEAK_PASSWORD.code)
                errorArray.push(WEAK_PASSWORD.code)
            else if (error.code === INVALID_EMAIL.code)
                errorArray.push(INVALID_EMAIL.code)
            else if (error.code === EMAIL_ALREADY_IN_USE.code)
                errorArray.push(EMAIL_ALREADY_IN_USE.code)
            else
                alert(error.message)
            setErrorState(errorArray)
        })
    }

    const onCreateAccountButtonClickHandler = () => {
        setErrorState([''])
        if (isCreatingAccount.includes('Create Account')) {
            setIsCreatingAccount([''])
            return
        }
        setIsCreatingAccount(['Create Account'])
    }

    console.log(errorState)

    return (
        <View style={styles.loginScreen}>
            {/*<ImageBackground style={{position: 'absolute', height: '100%', width: '100%'}} source={{uri: data.drinks[0].strDrinkThumb}}/>*/}
            <View style={styles.loginCard}>
                <View style={[styles.inputCard]}>
                    {(isCreatingAccount.includes('Create Account')) && (
                        <TextInput
                            style={[styles.input, (errorState.includes(USERNAME_MISSING.code)) && {backgroundColor: COLOR_INCORRECT_FIELD_INPUT}]}
                            onChangeText={input => {
                                setUsername(input)
                            }}
                            placeholder={'Username'}
                            value={username}/>
                    )}
                    <TextInput
                        style={[styles.input, (
                            errorState.includes(USER_NOT_FOUND.code)||
                            errorState.includes(EMAIL_MISSING.code) ||
                            errorState.includes(INVALID_EMAIL.code) ||
                            errorState.includes(EMAIL_ALREADY_IN_USE.code))
                        && {backgroundColor: COLOR_INCORRECT_FIELD_INPUT}]}
                        onChangeText={input => {
                            setEmail(input)
                        }}
                        placeholder={'Email'}
                        value={email}/>
                    <TextInput
                        style={[styles.input, (
                            errorState.includes(WRONG_PASSWORD.code) ||
                            errorState.includes(PASSWORD_MISSING.code) ||
                            errorState.includes(PASSWORDS_NOT_MATCHING.code) ||
                            errorState.includes(WEAK_PASSWORD.code))
                        && {backgroundColor: COLOR_INCORRECT_FIELD_INPUT}]}
                        onChangeText={input => {
                            setPassword(input)
                        }}
                        placeholder={'Password'}
                        secureTextEntry={true}/>
                    {(isCreatingAccount.includes('Create Account')) && (
                        <TextInput
                            style={[styles.input, (
                                errorState.includes(REPEAT_PASSWORD_MISSING.code) ||
                                errorState.includes(PASSWORDS_NOT_MATCHING.code) ||
                                errorState.includes(WEAK_PASSWORD.code))
                            && {backgroundColor: COLOR_INCORRECT_FIELD_INPUT}]}
                            onChangeText={input => {
                                setRepeatPassword(input)
                            }}
                            placeholder={'Repeat Password'}
                            secureTextEntry={true}/>
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
            </View>
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
        backgroundColor: COLOR_LABEL_BACKGROUND,
        padding: PADDING,
        borderRadius: BORDER_RADIUS / 2,
        alignItems: "center",
        justifyContent: 'center',
    },
    input: {
        backgroundColor: COLOR_LABEL_BACKGROUND,
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
    }
});
