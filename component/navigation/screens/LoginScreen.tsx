import {ScrollView, StyleSheet, View} from "react-native";
import {vh_reactive, vw_reactive} from "../../../functions/dimentions";
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

export default function LoginScreen() {
    const state = useAppSelector((state) => state)

    return (
        <AppBackground>
            <View style={styles.login}>
                    <View style={{
                        maxHeight: vh_reactive(0.9, state.dimensions.height),
                    }}>
                        <ScrollView style={{ flexGrow:0 }}>
                            <CardLayout
                                width={vw_reactive(0.7, state.dimensions.width)}>
                                {state.loginState === LOGIN_LABEL.en ? <Login/> : null}
                                {state.loginState === CREATE_ACCOUNT_LABEL.en ? <CreateAccount/> : null}
                                {state.loginState === FORGOT_PASSWORD_LABEL.en ? <ForgotPassword/> : null}
                            </CardLayout>
                        </ScrollView>
                    </View>
            </View>
            {
                state.isLoading ? (
                    <LoadingScreen/>
                ) : null
            }
            {
                state.isModal ? (
                    <Modal message={state.modalMessage}/>
                ) : null
            }
        </AppBackground>
    )
}

const styles = StyleSheet.create({
    login: {
        alignItems: "center",
        justifyContent: 'space-around',
        height: '100%'
    },
})
