import {ScrollView, StyleSheet, View} from "react-native";
import {vh, vh_reactive} from "../../../../functions/dimentions";
import CardLayout from "../../../layout/CardLayout";
import {useAppDispatch, useAppSelector} from "../../../../constants/hooks";
import {
    CHANGE_PASSWORD_LABEL,
    CHANGE_USERNAME_LABEL,
    EMAIL_LABEL,
    NEW_PASSWORD_LABEL,
    OLD_PASSWORD_LABEL,
    PASSWORD_SUCCESSFUL_CHANGED, PROFILE_DETAILS_LABEL,
    REPEAT_PASSWORD_LABEL,
    USERNAME_LABEL,
    USERNAME_SUCCESSFUL_CHANGED
} from "../../../../constants/labels";
import ProfileDetailsItem from "../../../user_profile/ProfileDetailsItem";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../../../constants/style_constants";
import Header from "../../../layout/Header";
import AppBackground from "../../../layout/AppBackground";
import LoadingScreen from "../../../layout/LoadingScreen";
import {
    COLOR_BACKGROUND,
    COLOR_HEADER,
} from "../../../../constants/color_styles";
import FilterButton from "../../../home/filter/FilterButton";
import React, {useState} from "react";
import {app, isUsernameUsed, updateUser} from "../../../../functions/firebase";
import {
    NEW_PASSWORD_MISSING, OLD_AND_NEW_PASSWORDS_MATCHING,
    OLD_PASSWORD_MISSING, PASSWORDS_NOT_MATCHING,
    REPEAT_PASSWORD_MISSING,
    USERNAME_ALREADY_USED,
    USERNAME_MISSING
} from "../../../../constants/error_codes";
import {
    getOldPasswordError,
    getPasswordError,
    getRepeatPasswordError,
    getUsernameError
} from "../../../../functions/getErrorFunctionsInputs";
import StyledButton from "../../../layout/StyledButton";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../../../reducers/booleans/isLoadingReducer";
import {
    getAuth,
    updateProfile,
    updatePassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {activeUser} from "../../../../reducers/user/userReducer";
import Modal from "../../../layout/Modal";
import {invertIsModalState} from "../../../../reducers/booleans/isModalReducer";
import {changeModalMessage} from "../../../../reducers/general/modalMessageReducer";
import TextInputWithErrorMessage from "../../../layout/TextInputWithErrorMessage";
import {
    NETWORK_REQUEST_FAILED,
    TOO_MANY_REQUESTS, WEAK_PASSWORD,
    WRONG_PASSWORD
} from "../../../../constants/error_codes_firebase";
import HeadLine from "../../../layout/HeadLine";

export default function ProfileDetails({navigation}: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: string = state.language
    const [username, setUsername] = useState('');
    const [isChangingUsername, setIsChangingUsername] = useState(['']);
    const [isChangingPassword, setIsChangingPassword] = useState(['']);
    const [errorStateUsername, setErrorStateUsername] = useState(['']);
    const [errorStateOldPassword, setErrorStateOldPassword] = useState(['']);
    const [errorStateNewPassword, setErrorStateNewPassword] = useState(['']);
    const [errorStateRepeatPassword, setErrorStateRepeatPassword] = useState(['']);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
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
            if (arrayErrorStateUsername.length > 0) {
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
                        dispatch(changeModalMessage(USERNAME_SUCCESSFUL_CHANGED[`${language}`]))
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
        setErrorStateOldPassword([])
        setErrorStateNewPassword([])
        setErrorStateRepeatPassword([])
        setOldPassword('')
        setNewPassword('')
        setRepeatPassword('')
        setIsChangingUsername([''])
        if (isChangingPassword.includes(CHANGE_PASSWORD_LABEL.ENG)) {
            setIsChangingPassword([''])
            return
        }
        setIsChangingPassword([CHANGE_PASSWORD_LABEL.ENG])
    }

    const changePasswordOnClickHandler = () => {
        dispatch(setIsLoadingTrue())
        let errorArrayOldPassword: string[] = []
        let errorArrayNewPassword: string[] = []
        let errorArrayRepeatPassword: string[] = []
        if (oldPassword === '') {
            errorArrayOldPassword.push(OLD_PASSWORD_MISSING.code)
        }
        if (newPassword === '') {
            errorArrayNewPassword.push(NEW_PASSWORD_MISSING.code)
        }
        if (repeatPassword === '') {
            errorArrayRepeatPassword.push(REPEAT_PASSWORD_MISSING.code)
        }
        if (repeatPassword !== newPassword) {
            errorArrayNewPassword.push(PASSWORDS_NOT_MATCHING.code)
            errorArrayRepeatPassword.push(PASSWORDS_NOT_MATCHING.code)
        }
        if (oldPassword === newPassword || oldPassword === repeatPassword) {
            errorArrayOldPassword.push(OLD_AND_NEW_PASSWORDS_MATCHING.code)
            errorArrayNewPassword.push(OLD_AND_NEW_PASSWORDS_MATCHING.code)
            errorArrayRepeatPassword.push(OLD_AND_NEW_PASSWORDS_MATCHING.code)
        }
        if ((errorArrayOldPassword.length > 0) ||
            (errorArrayNewPassword.length > 0) ||
            (errorArrayRepeatPassword.length > 0)) {
            setErrorStateOldPassword(errorArrayOldPassword)
            setErrorStateNewPassword(errorArrayNewPassword)
            setErrorStateRepeatPassword(errorArrayRepeatPassword)
            dispatch(setIsLoadingFalse())
            return
        }
        if (state.user.email) {
            signInWithEmailAndPassword(auth, state.user.email, oldPassword).then(result => {
                updatePassword(result.user, newPassword).then(() => {
                    dispatch(changeModalMessage(PASSWORD_SUCCESSFUL_CHANGED[`${language}`]))
                    dispatch(invertIsModalState())
                    onChangePasswordPressHandler()
                    dispatch(setIsLoadingFalse())
                }).catch((error) => {
                    if (error.code === WEAK_PASSWORD.code) {
                        errorArrayNewPassword.push(WEAK_PASSWORD.code)
                        errorArrayRepeatPassword.push(WEAK_PASSWORD.code)
                    } else if (error.code === TOO_MANY_REQUESTS.code) {
                        dispatch(changeModalMessage(TOO_MANY_REQUESTS.message[`${language}`]))
                        dispatch(invertIsModalState())
                    } else if (error.code === NETWORK_REQUEST_FAILED.code) {
                        dispatch(changeModalMessage(NETWORK_REQUEST_FAILED.message[`${language}`]))
                        dispatch(invertIsModalState())
                    } else {
                        dispatch(changeModalMessage(error.message))
                        dispatch(invertIsModalState())
                    }
                    setErrorStateOldPassword(errorArrayOldPassword)
                    setErrorStateNewPassword(errorArrayNewPassword)
                    setErrorStateRepeatPassword(errorArrayRepeatPassword)
                    dispatch(setIsLoadingFalse())
                });
            }).catch(error => {
                if (error.code === WRONG_PASSWORD.code)
                    errorArrayOldPassword.push(WRONG_PASSWORD.code)
                else if (error.code === TOO_MANY_REQUESTS.code) {
                    dispatch(changeModalMessage(TOO_MANY_REQUESTS.message[`${language}`]))
                    dispatch(invertIsModalState())
                } else if (error.code === NETWORK_REQUEST_FAILED.code) {
                    dispatch(changeModalMessage(NETWORK_REQUEST_FAILED.message[`${language}`]))
                    dispatch(invertIsModalState())
                } else {
                    dispatch(changeModalMessage(error.message))
                    dispatch(invertIsModalState())
                }
                setErrorStateOldPassword(errorArrayOldPassword)
                setErrorStateNewPassword(errorArrayNewPassword)
                setErrorStateRepeatPassword(errorArrayRepeatPassword)
                dispatch(setIsLoadingFalse())
            })
        }
    }

    return (
        <AppBackground>
            <ScrollView style={[styles.userData, {height: vh_reactive(0.9, state.dimensions.height)}]}>
                <CardLayout>
                    <HeadLine label={PROFILE_DETAILS_LABEL[`${language}`]} margin={MARGIN / 2}/>
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
                        margin={MARGIN / 2}/>
                    <View style={styles.inputCard}>
                        {(isChangingUsername.includes(CHANGE_USERNAME_LABEL.ENG)) ? (
                            <>
                                <TextInputWithErrorMessage
                                    errorState={(getUsernameError(errorStateUsername))}
                                    setInputState={setUsername}
                                    inputState={username}
                                    placeholderLabel={USERNAME_LABEL[`${language}`]}
                                />
                                <StyledButton
                                    onPress={changeUserNameOnClickHandler}
                                    title={CHANGE_USERNAME_LABEL[`${language}`]}
                                    padding={PADDING}
                                    margin={MARGIN}/>
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
                        margin={MARGIN / 2}
                    />
                    <View style={styles.inputCard}>
                        {(isChangingPassword.includes(CHANGE_PASSWORD_LABEL.ENG)) ? (
                            <>
                                <TextInputWithErrorMessage
                                    errorState={(getOldPasswordError(errorStateOldPassword))}
                                    setInputState={setOldPassword}
                                    inputState={oldPassword}
                                    placeholderLabel={OLD_PASSWORD_LABEL[`${language}`]}
                                    isPassword={true}/>
                                <TextInputWithErrorMessage
                                    errorState={(getPasswordError(errorStateNewPassword))}
                                    setInputState={setNewPassword}
                                    inputState={newPassword}
                                    placeholderLabel={NEW_PASSWORD_LABEL[`${language}`]}
                                    isPassword={true}/>
                                <TextInputWithErrorMessage
                                    errorState={(getRepeatPasswordError(errorStateRepeatPassword))}
                                    setInputState={setRepeatPassword}
                                    inputState={repeatPassword}
                                    placeholderLabel={REPEAT_PASSWORD_LABEL[`${language}`]}
                                    isPassword={true}/>
                                <StyledButton
                                    onPress={changePasswordOnClickHandler}
                                    title={CHANGE_PASSWORD_LABEL[`${language}`]}
                                    padding={PADDING}
                                    margin={MARGIN}/>
                            </>
                        ) : null}
                    </View>
                </CardLayout>
            </ScrollView>
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
        // width: '100%',
        marginHorizontal: MARGIN / 2,
        backgroundColor: COLOR_HEADER,
        borderRadius: BORDER_RADIUS / 2,
    },
})
