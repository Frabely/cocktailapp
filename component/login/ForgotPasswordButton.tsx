import {Pressable, StyleSheet, Text, View} from "react-native";
import {MARGIN} from "../../constants/style_constants";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../constants/color_styles";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {forgotPassword} from "../../reducers/login/loginStateReducer";
import {useState} from "react";
import {Language} from "../../constants/types";

export default function ForgotPasswordButton({}: ForgotPasswordButtonProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [isTouched, setIsTouched] = useState(false);
    const language: Language = state.language

    const onForgotPasswordPressHandler = () => {
        dispatch(forgotPassword())
    }

    return (
        <View style={styles.button}>
            <Pressable onPress={onForgotPasswordPressHandler}
                       onTouchStart={() => setIsTouched(true)}
                       onTouchEnd={() => setIsTouched(false)}>
                <Text style={{
                    color: isTouched ? COLOR_BACKGROUND : COLOR_HEADER,
                }
                }>{language.labels.FORGOT_PASSWORD_LABEL}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: MARGIN / 2,
        alignItems: 'center'
    },
    text : {
        fontWeight: 'bold'
    }
})

export type ForgotPasswordButtonProps ={}
