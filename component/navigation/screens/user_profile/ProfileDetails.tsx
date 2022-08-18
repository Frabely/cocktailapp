import {StyleSheet, View} from "react-native";
import {vh} from "../../../../functions/dimentions";
import CardLayout from "../../../layout/CardLayout";
import {useAppSelector} from "../../../../constants/hooks";
import {CHANGE_PASSWORD_LABEL, CHANGE_USERNAME_LABEL, EMAIL_LABEL, USERNAME_LABEL} from "../../../../constants/labels";
import ProfileDetailsItem from "../../../user_profile/ProfileDetailsItem";
import StyledButton from "../../../layout/StyledButton";
import {PADDING} from "../../../../constants/style_constants";
import Header from "../../../layout/Header";
import AppBackground from "../../../layout/AppBackground";
import LoadingScreen from "../../../layout/LoadingScreen";

export default function ProfileDetails({navigation}: any) {
    const state = useAppSelector((state) => state)
    const language: any = state.language

    const onChangePasswordPressHandler = () => {

    }

    const onChangeUsernamePressHandler = () => {

    }

    return (
        <AppBackground>
            <View style={styles.userData}>
                <CardLayout>
                    <ProfileDetailsItem label={USERNAME_LABEL[`${language}`]} value={state?.user?.username}/>
                    <ProfileDetailsItem label={EMAIL_LABEL[`${language}`]} value={state?.user?.email}/>
                    <StyledButton
                        padding={PADDING}
                        width={'100%'}
                        onPress={onChangeUsernamePressHandler}
                        title={CHANGE_USERNAME_LABEL[`${language}`]}/>
                    <StyledButton
                        padding={PADDING}
                        width={'100%'}
                        onPress={onChangePasswordPressHandler}
                        title={CHANGE_PASSWORD_LABEL[`${language}`]}/>
                </CardLayout>
            </View>
            <Header navigation={navigation}/>
            {state.isLoading ? (
                <LoadingScreen/>
            ) : null}
        </AppBackground>
    )
};

const styles = StyleSheet.create({
    userData: {
        height: vh(0.9),
        width: '100%'
    },
})
