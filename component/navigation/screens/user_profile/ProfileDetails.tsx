import {StyleSheet, View} from "react-native";
import {vh, vw} from "../../../../functions/dimentions";
import CardLayout from "../../../layout/CardLayout";
import {useAppDispatch, useAppSelector} from "../../../../constants/hooks";
import {
    CHANGE_PASSWORD_LABEL,
    CHANGE_USERNAME_LABEL,
    EMAIL_LABEL,
    USERNAME_LABEL, USERNAME_SUCCESSFUL_UPDATED
} from "../../../../constants/labels";
import ProfileDetailsItem from "../../../user_profile/ProfileDetailsItem";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../../constants/style_constants";
import Header from "../../../layout/Header";
import AppBackground from "../../../layout/AppBackground";
import LoadingScreen from "../../../layout/LoadingScreen";
import {
    COLOR_BACKGROUND,
    COLOR_HEADER,
    COLOR_INCORRECT_FIELD_INPUT
} from "../../../../constants/color_styles";
import FilterButton from "../../../home/filter/FilterButton";
import React, {useState} from "react";
import {app, isUsernameUsed, updateUser} from "../../../../functions/firebase";
import {USERNAME_ALREADY_USED, USERNAME_MISSING} from "../../../../constants/error_codes";
import {getUsernameError} from "../../../../functions/getErrorFunctionsInputs";
import StyledButton from "../../../layout/StyledButton";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../../reducers/booleans/isLoadingReducer";
import {getAuth, updateProfile} from "firebase/auth";
import {activeUser} from "../../../../reducers/user/userReducer";
import Modal from "../../../layout/Modal";
import {invertIsModalState} from "../../../../reducers/booleans/isModalReducer";
import {changeModalMessage} from "../../../../reducers/general/modalMessageReducer";
import TextInputWithErrorMessage from "../../../layout/TextInputWithErrorMessage";

export default function ProfileDetails({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: string = state.language
    const [username, setUsername] = useState('');
    const [isChangingUsername, setIsChangingUsername] = useState(['']);
    const [isChangingPassword, setIsChangingPassword] = useState(['']);
    const [errorStateUsername, setErrorStateUsername] = useState(['']);
    const auth = getAuth(app)

    const onChangeUsernamePressHandler = () => {
        setIsChangingPassword([''])
        if (isChangingUsername.includes(CHANGE_USERNAME_LABEL.ENG)) {
            setIsChangingUsername([''])
            return
        }
        setIsChangingUsername([CHANGE_USERNAME_LABEL.ENG])
        setErrorStateUsername([''])
        setUsername('')
    }

    const changeUserNameOnClickHandler = async () => {
        dispatch(setIsLoadingTrue())
        await isUsernameUsed(username.toLowerCase()).then(async (result) => {
            let arrayErrorStateUsername: string[] = []
            if (!auth.currentUser) {
                dispatch(setIsLoadingFalse())
                return
            }
            if (result) {
                arrayErrorStateUsername.push(USERNAME_ALREADY_USED.code)
            }
            if (username.trim() === '') {
                arrayErrorStateUsername.push(USERNAME_MISSING.code)
            }
            if (!arrayErrorStateUsername) {
                setErrorStateUsername(arrayErrorStateUsername)
                dispatch(setIsLoadingFalse())
                return
            }
            await updateProfile(auth.currentUser, {displayName: username}).then(async () => {
                if (state.user.userID) {
                    await updateUser(
                        state.user.userID,
                        {
                            username: username,
                            usernameLower: username.toLowerCase(),
                        }).then(() => {
                        const currentUser = state.user
                        dispatch(activeUser({
                            username: username,
                            email: currentUser.email,
                            userID: currentUser.userID,
                            languageSetting: currentUser.languageSetting
                        }))
                        dispatch(changeModalMessage(USERNAME_SUCCESSFUL_UPDATED[`${language}`]))
                        dispatch(setIsLoadingFalse())
                        dispatch(invertIsModalState())
                        onChangeUsernamePressHandler()
                    }).catch(error => {
                        console.log(error.message)
                        alert(error.message)
                    })
                } else
                    dispatch(setIsLoadingFalse())
            })
        }).catch(error => {
            console.log(error.message)
            alert(error.message)
        })
    }

    const onChangePasswordPressHandler = () => {
        setIsChangingUsername([''])
        if (isChangingPassword.includes(CHANGE_PASSWORD_LABEL.ENG)) {
            setIsChangingPassword([''])
            return
        }
        setIsChangingPassword([CHANGE_PASSWORD_LABEL.ENG])
    }


    return (
        <AppBackground>
            <View style={styles.userData}>
                <CardLayout>
                    <ProfileDetailsItem
                        label={USERNAME_LABEL[`${language}`]}
                        value={(state?.user?.username) ? state?.user?.username : ''}/>
                    <ProfileDetailsItem
                        label={EMAIL_LABEL[`${language}`]}
                        value={(state?.user?.email) ? state?.user?.email : ''}/>
                    <FilterButton
                        title={CHANGE_USERNAME_LABEL[`${language}`]}
                        titleENG={CHANGE_USERNAME_LABEL.ENG}
                        colorActive={COLOR_HEADER}
                        colorInactive={COLOR_BACKGROUND}
                        onClick={onChangeUsernamePressHandler}
                        state={isChangingUsername}
                        padding={PADDING}
                        width={'100%'}/>
                    <View style={[styles.inputCard,
                        (isChangingUsername.includes(CHANGE_USERNAME_LABEL.ENG)) && !!getUsernameError(errorStateUsername) ? {paddingBottom: PADDING} : null]}>
                        {(isChangingUsername.includes(CHANGE_USERNAME_LABEL.ENG)) ? (
                            <>
                                <TextInputWithErrorMessage
                                    errorState={(getUsernameError(errorStateUsername))}
                                    setInputState={setUsername}
                                    inputState={username}
                                    placeholderLabel={USERNAME_LABEL[`${language}`]}/>
                                <StyledButton onPress={changeUserNameOnClickHandler}
                                              title={CHANGE_USERNAME_LABEL[`${language}`]}
                                              width={'50%'}/>
                            </>
                        ) : null}
                    </View>
                    <FilterButton
                        title={CHANGE_PASSWORD_LABEL[`${language}`]}
                        titleENG={CHANGE_PASSWORD_LABEL.ENG}
                        colorActive={COLOR_HEADER}
                        colorInactive={COLOR_BACKGROUND}
                        onClick={onChangePasswordPressHandler}
                        state={isChangingPassword}
                        padding={PADDING}
                        width={'100%'}/>
                </CardLayout>
            </View>
            <Header navigation={navigation}/>
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
            {state.isModal ? (
                <Modal message={state.modalMessage}/>
            ) : null}
        </AppBackground>
    )
};

const styles = StyleSheet.create({
    userData: {
        height: vh(0.9),
        width: '100%'
    },
    inputCard: {
        width: '100%',
        marginBottom: MARGIN / 2,
        backgroundColor: COLOR_HEADER,
        borderRadius: BORDER_RADIUS / 2,
    },
    input: {
        borderRadius: BORDER_RADIUS / 2,
        padding: PADDING,
        margin: MARGIN
    },
    wrongInputMessage: {
        maxWidth: vw(0.7) - MARGIN - PADDING,
        color: COLOR_INCORRECT_FIELD_INPUT,
        marginLeft: MARGIN,
        paddingLeft: PADDING,
        marginRight: MARGIN,
        paddingRight: PADDING
    }
})
