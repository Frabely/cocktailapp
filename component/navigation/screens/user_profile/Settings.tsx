import {StyleSheet, Text, View} from "react-native";
import {vh} from "../../../../functions/dimentions";
import AppBackground from "../../../layout/AppBackground";
import Header from "../../../layout/Header";
import CardLayout from "../../../layout/CardLayout";
import Switch from "../../../home/filter/Switch";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../../../constants/color_styles";
import {
    ENGLISH_LABEL,
    GERMAN_LABEL, LANGUAGE_LABEL,
    SAVE_SETTINGS_LABEL
} from "../../../../constants/labels";
import {useAppDispatch, useAppSelector} from "../../../../constants/hooks";
import StyledButton from "../../../layout/StyledButton";
import React, {useState} from "react";
import {changeLanguage} from "../../../../reducers/user/languageReducer";
import {ENGLISH, GERMAN} from "../../../../constants/const_vars";
import {BORDER_RADIUS, MARGIN} from "../../../../constants/style_constants";
import {updateUser} from "../../../../functions/firebase";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../../reducers/booleans/isLoadingReducer";

export default function Settings({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [isLeftActive, setIsLeftActive] = useState((state.language === ENGLISH))
    const language: any = state.language

    const onSaveSettingsHandler = async () => {
        dispatch(setIsLoadingTrue())
        navigation.goBack()
        if (isLeftActive) {
            dispatch(changeLanguage(ENGLISH))
            await updateUser(
                `${state.user.userID}`,
                {languageSetting: ENGLISH
            })
        } else {
            dispatch(changeLanguage(GERMAN))
            await updateUser(
                `${state.user.userID}`,
                {languageSetting: GERMAN
            })
        }
        dispatch(setIsLoadingFalse())
    }
    return (
        <AppBackground>
            <View style={styles.settings}>
                <CardLayout>
                    <View style={styles.profileDetailsItem}>
                        <Text style={{fontWeight: 'bold', flex: 1}}>{LANGUAGE_LABEL[`${language}`]}:</Text>
                        <View style={{flex: 1}}>
                            <Switch colorSelected={COLOR_HEADER}
                                    color={COLOR_BACKGROUND}
                                    leftTitle={ENGLISH_LABEL[`${language}`]}
                                    rightTitle={GERMAN_LABEL[`${language}`]}
                                    isLeftActive={isLeftActive}
                                    setIsLeftActive={setIsLeftActive}/>
                        </View>
                    </View>

                    <StyledButton width={'100%'}
                                  onPress={onSaveSettingsHandler}
                                  title={SAVE_SETTINGS_LABEL[`${language}`]}/>
                </CardLayout>
            </View>
            <Header navigation={navigation}/>
        </AppBackground>
    )

}

const styles = StyleSheet.create({
    settings: {
        height: vh(0.9),
        width: '100%'
    },
    profileDetailsItem: {
        width: '100%',
        flexDirection: 'row',
        margin: MARGIN / 2,
        borderRadius: BORDER_RADIUS / 2,
        alignItems: 'center'
    }
})
