import {StyleSheet, View} from "react-native";
import {vh} from "../../../functions/dimentions";
import CardLayout from "../../layout/CardLayout";
import {useAppSelector} from "../../../constants/hooks";
import {CHANGE_PASSWORD, CHANGE_USERNAME, EMAIL, USERNAME} from "../../../constants/labels";
import ProfileDetailsItem from "../../user_profile/ProfileDetailsItem";
import StyledButton from "../../layout/StyledButton";
import {PADDING} from "../../../constants/style_constants";

export default function ProfileDetails() {
    const state = useAppSelector((state) => state)

    const onChangePasswordPressHandler = () => {

    }

    const onChangeUsernamePressHandler = () => {

    }

    return (
        <View style={styles.userData}>
            <CardLayout>
                <ProfileDetailsItem label={USERNAME.ENG} value={state?.user?.username} />
                <ProfileDetailsItem label={EMAIL.ENG} value={state?.user?.email} />
                <StyledButton flex={1}
                              padding={PADDING}
                              width={'100%'}
                              onPress={onChangeUsernamePressHandler}
                              title={CHANGE_USERNAME.ENG}/>
                <StyledButton flex={1}
                              padding={PADDING}
                              width={'100%'}
                              onPress={onChangePasswordPressHandler}
                              title={CHANGE_PASSWORD.ENG}/>
            </CardLayout>
        </View>
    )
};

const styles = StyleSheet.create({
    userData: {
        height: vh(0.9),
        width: '100%'
    },
})
