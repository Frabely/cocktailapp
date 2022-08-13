import {StyleSheet, View, Text} from "react-native";
import {COLOR_BACKGROUND} from "../../constants/color_styles";
import {vh} from "../../functions/dimentions";
import CardLayout from "../layout/CardLayout";

export default function UserProfileSettings() {
    return (
        <View style={styles.userData}>
            <CardLayout>
                <Text>test</Text>
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
