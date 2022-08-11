import {StyleSheet, TextInput, View} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {COLOR_BACKGROUND, COLOR_HEADER, LABEL_BACKGROUND} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import StyledButton from "../StyledButton";
import {app} from "../../functions/firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {activeUser} from "../../reducers/user/userReducer";
import FilterButton from "../home/menu/filter/FilterButton";

export default function LoginScreen() {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const auth = getAuth(app)
    const [isCreatingAccount, setIsCreatingAccount] = useState(['']);

    const onLoginHandler = () => {
        // const handleUser = (user: any) => {
        //     // dispatch(activeUser({
        //     //     name: user.user.updateProfile({
        //     //         displayName: username
        //     //     }),
        //     //     email: user.user.email,
        //     // }))
        // }
        // const handleError = (error: any) => {
        //     alert(error.message)
        // }
        signInWithEmailAndPassword(auth, email, password).then(user => {
            dispatch(activeUser({
                name: user.user.displayName,
                email: user.user.email,
            }))
        }).catch(error => {
            alert(error.message)
        })
    }

    const onCreatAccountHandler = () => {
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
            alert(error.message)
        })
    }

    const onCreateAccountButtonClickHandler = () => {
        if (isCreatingAccount.includes('Create Account')) {
            setIsCreatingAccount([''])
            return
        }
        setIsCreatingAccount(['Create Account'])
    }

    return (
        <View style={styles.loginScreen}>
            <View style={styles.loginCard}>
                <View style={[styles.inputCard]}>
                    {(isCreatingAccount.includes('Create Account')) && (
                        <TextInput
                            style={styles.input}
                            onChangeText={input => {
                                setUsername(input)
                            }}
                            placeholder={'Username'}/>
                    )}
                    <TextInput
                        style={styles.input}
                        onChangeText={input => {
                            setEmail(input)
                        }}
                        placeholder={'Email'}/>
                    <TextInput
                        style={styles.input}
                        onChangeText={input => {
                            setPassword(input)
                        }}
                        placeholder={'Password'}
                        secureTextEntry={true}/>
                    {(isCreatingAccount.includes('Create Account')) && (
                        <TextInput
                            style={styles.input}
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
        backgroundColor: LABEL_BACKGROUND,
        padding: PADDING,
        borderRadius: BORDER_RADIUS / 2,
        alignItems: "center",
        justifyContent: 'center',
    },
    input: {
        backgroundColor: LABEL_BACKGROUND,
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
