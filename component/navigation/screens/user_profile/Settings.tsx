import {Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import {vh, vh_reactive} from "../../../../functions/dimentions";
import AppBackground from "../../../layout/AppBackground";
import Header from "../../../layout/Header";
import CardLayout from "../../../layout/CardLayout";
import Switch from "../../../home/filter/Switch";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../../../constants/color_styles";
import {
    ENGLISH_LABEL,
    GERMAN_LABEL, LANGUAGE_LABEL,
    SAVE_SETTINGS_LABEL, SETTINGS_LABEL
} from "../../../../constants/labels";
import {useAppDispatch, useAppSelector} from "../../../../constants/hooks";
import StyledButton from "../../../layout/StyledButton";
import React, {useState} from "react";
import {changeLanguage} from "../../../../reducers/user/languageReducer";
import {ENGLISH, GERMAN} from "../../../../constants/const_vars";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../../constants/style_constants";
import {updateUser} from "../../../../functions/firebase";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../../reducers/booleans/isLoadingReducer";
import LoadingScreen from "../../../layout/LoadingScreen";
import HeadLine from "../../../layout/HeadLine";

export default function Settings({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [isLeftActive, setIsLeftActive] = useState((state.language === ENGLISH))
    const language: string = state.language

    const onSaveSettingsHandler = async () => {
        dispatch(setIsLoadingTrue())
        navigation.goBack()
        if (isLeftActive) {
            dispatch(changeLanguage(ENGLISH))
            await updateUser(
                `${state.user.userID}`,
                {languageSetting: ENGLISH}
            )
        }
        else {
            dispatch(changeLanguage(GERMAN))
            await updateUser(
                `${state.user.userID}`,
                {languageSetting: GERMAN})
        }
        dispatch(setIsLoadingFalse())
    }
    return (
        <AppBackground>
            <ScrollView style={[styles.settings, {
                height: vh_reactive(0.9, state.dimensions.height)
            }]}>
                <CardLayout>
                    <HeadLine label={SETTINGS_LABEL[`${language}`]} margin={MARGIN / 2}/>
                    <View style={[styles.profileDetailsItem,
                        {flex: (Platform.OS === "android") ? undefined : 1}]}>
                        <Text style={{fontWeight: 'bold', flex: 1}}>{LANGUAGE_LABEL[`${language}`]}:</Text>
                        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                            <Switch colorSelected={COLOR_HEADER}
                                    color={COLOR_BACKGROUND}
                                    leftTitle={ENGLISH_LABEL[`${language}`]}
                                    rightTitle={GERMAN_LABEL[`${language}`]}
                                    isLeftActive={isLeftActive}
                                    setIsLeftActive={setIsLeftActive}/>
                        </View>
                    </View>
                    <StyledButton
                        margin={MARGIN / 2}
                        padding={PADDING}
                        onPress={onSaveSettingsHandler}
                        title={SAVE_SETTINGS_LABEL[`${language}`]}/>
                </CardLayout>
            </ScrollView>
            <Header navigation={navigation}/>
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
        </AppBackground>
    )

}

const styles = StyleSheet.create({
    settings: {
        height: vh(0.9),
        width: '100%'
    },
    profileDetailsItem: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: PADDING,
        margin: MARGIN / 2,
        borderRadius: BORDER_RADIUS / 2,
        alignItems: 'center',
    }
})
