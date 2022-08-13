import {StyleSheet, View, Text} from "react-native";
import {vh} from "../../../functions/dimentions";
import CardLayout from "../../layout/CardLayout";
import {useAppSelector} from "../../../constants/hooks";
import {EMAIL, USERNAME} from "../../../constants/labels";

export default function ProfileDetails() {
    const state = useAppSelector((state) => state)

    return (
        <View style={styles.userData}>
            <CardLayout>
                <Text>{USERNAME.ENG}</Text>
                    <Text>{state?.user?.username}</Text>
                <Text>{EMAIL.ENG}</Text>
                <Text>{state?.user?.email}</Text>
            </CardLayout>
        </View>
    )
};

const styles = StyleSheet.create({
    userData: {
        height: vh(0.9),
        width: '100%'
    }
})
