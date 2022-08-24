import {Image, StyleSheet, View} from "react-native";
import {vh, vh_reactive, vw_reactive} from "../../../functions/dimentions";
import {
    COLOR_BACKGROUND,
} from "../../../constants/color_styles";
import {useAppSelector} from "../../../constants/hooks";
import CardLayout from "../../layout/CardLayout";
import AppBackground from "../../layout/AppBackground";
import {
    CREATE_ACCOUNT_LABEL, FORGOT_PASSWORD_LABEL,
    LOGIN_LABEL,
} from "../../../constants/labels";
import LoadingScreen from "../../layout/LoadingScreen";
import Modal from "../../layout/Modal";
import ForgotPassword from "../../login/ForgotPassword";
import Login from "../../login/Login";
import CreateAccount from "../../login/CreateAccount";
import {useEffect} from "react";

export default function LoginScreen() {
    const state = useAppSelector((state) => state)

    useEffect(() => {

    }, [state.dimensions.height, state.dimensions.width])

    return (
        <AppBackground>
            <View style={[styles.loginScreen, {
                height: vh_reactive(1, state.dimensions.height)
            }]}>
                <Image style={{position: 'absolute', height: '100%', width: '100%'}}
                       source={require('../../../assets/images/adaptive_background.png')}/>
                <CardLayout width={vw_reactive(0.7, state.dimensions.width)}>
                    {state.loginState === LOGIN_LABEL.ENG ? <Login/> : null}
                    {state.loginState === CREATE_ACCOUNT_LABEL.ENG ? <CreateAccount/> : null}
                    {state.loginState === FORGOT_PASSWORD_LABEL.ENG ? <ForgotPassword/> : null}
                </CardLayout>
            </View>
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
            {state.isModal ? (
                <Modal message={state.modalMessage}/>
            ) : null}
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
});
