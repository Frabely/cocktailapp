import {StyleSheet, TextInput, View} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {COLOR_BACKGROUND, LABEL_BACKGROUND} from "../../constants/color_styles";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import StyledButton from "../StyledButton";

export default function LoginScreen() {

    const onLoginHandler = () => {

    }

    const onCreateAccountHandler = () => {

    }

    return (
        <View style={styles.loginScreen}>
            <View style={styles.loginCard}>
                <View style={styles.inputCard}>
                    <TextInput style={styles.input} placeholder={'Email'}></TextInput>
                    <TextInput style={styles.input} placeholder={'Password'} secureTextEntry={true}></TextInput>
                </View>
                <StyledButton width={vw(0.3)} onPress={onLoginHandler} title={'Login'} />
                <StyledButton width={vw(0.3)} onPress={onCreateAccountHandler} title={'Create Account'} />
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
        backgroundColor: COLOR_BACKGROUND,
        borderRadius: BORDER_RADIUS/2,
    }
});
