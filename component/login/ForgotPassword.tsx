import {MARGIN} from "../../constants/style_constants";
import {Pressable, Text, View} from "react-native";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../constants/color_styles";
import {FORGOT_PASSWORD_LABEL} from "../../constants/labels";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {changeModalMessage} from "../../reducers/general/modalMessageReducer";
import {invertIsModalState} from "../../reducers/booleans/isModalReducer";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {app} from "../../functions/firebase";

export default function ForgotPassword({}: ForgotPassword) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: string = state.language

    const [isTouched, setIsTouched] = useState(false);

    const onForgotPasswordPressHandler = () => {
        const auth = getAuth(app);
        // sendPasswordResetEmail(auth, 'moritz-hecht@gmx.net')
        //     .then(() => {
        //         // Password reset email sent!
        //         // ..
        //     })
        //     .catch((error) => {
        //         console.log(error.message)
        //     });
        dispatch(changeModalMessage('Unlucky'))
        dispatch(invertIsModalState())
    }

    return (
        <View style={{marginVertical: MARGIN / 2, alignItems: 'center'}}>
            <Pressable onPress={onForgotPasswordPressHandler}
                       onTouchStart={() =>setIsTouched(true)}
                       onTouchEnd={() => setIsTouched(false)}>
                <Text style={{
                    color: isTouched ? COLOR_BACKGROUND: COLOR_HEADER,
                    fontWeight: 'bold'}
                }>{FORGOT_PASSWORD_LABEL[`${language}`]}</Text>
            </Pressable>
        </View>
    )
}

export type ForgotPassword = {}
