import {StyleSheet, TextInput, View} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {COLOR_BACKGROUND, LABEL_BACKGROUND} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import StyledButton from "../StyledButton";
import {app} from "./../../functions/firebase";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {activeUser} from "../../reducers/user/userReducer";

export default function LoginScreen() {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app)

    const onLoginHandler = () => {
        signInWithEmailAndPassword(auth, email, password).then(user => {
            alert('logged in')
            dispatch(activeUser({
                name: user.user.displayName,
                email: user.user.email,
            }))
        }).catch(error => {
            alert(error.message)
        })
    }

    const onCreateAccountHandler = () => {

        createUserWithEmailAndPassword(auth, email, password).then(user => {
            dispatch(activeUser({
                name: user.user.displayName,
                email: user.user.email,
            }))
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <View style={styles.loginScreen}>
            <View style={styles.loginCard}>
                <View style={styles.inputCard}>
                    <TextInput
                        style={styles.input}
                        onChangeText={input => {setEmail(input)}}
                        placeholder={'Email'}/>
                    <TextInput
                        style={styles.input}
                        onChangeText={input => {setPassword(input)}}
                        placeholder={'Password'}
                        secureTextEntry={true}/>
                </View>
                <StyledButton width={'100%'} onPress={onLoginHandler} title={'Login'} />
                <StyledButton width={'100%'} onPress={onCreateAccountHandler} title={'Create Account'} />
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
        borderRadius: BORDER_RADIUS/2,
        alignItems: "center",
        justifyContent: 'center'
    },
    input: {
        backgroundColor: LABEL_BACKGROUND,
        borderRadius: BORDER_RADIUS/2,
        padding: PADDING,
        margin: MARGIN
    },
    inputCard: {
        width: '100%',
        backgroundColor: COLOR_BACKGROUND,
        borderRadius: BORDER_RADIUS/2,
    }
});
