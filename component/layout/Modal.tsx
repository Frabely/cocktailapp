import {StyleSheet, View, Text, Pressable} from "react-native";
import {vh, vw} from "../../functions/dimentions";
import {COLOR_HEADER, OPACITY_ZERO} from "../../constants/color_styles";
import CardLayout from "./CardLayout";
import StyledButton from "./StyledButton";
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {CLOSE} from "../../constants/labels";
import {invertIsModalState} from "../../reducers/booleans/isModalReducer";
import {BORDER_RADIUS, PADDING} from "../../constants/style_constants";
import {changeModalMessage} from "../../reducers/general/modalMessageReducer";

export default function Modal(props: any) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const language: any = state.language

    const closeModelOnPressHandler = () => {
        dispatch(changeModalMessage(''))
        dispatch(invertIsModalState())
    }
    return (
        <Pressable onPress={closeModelOnPressHandler} style={styles.modalBackground}>
            <View style={styles.modalInner}>
                <CardLayout>
                    <Text>{props.message}</Text>
                    <StyledButton width={'50%'} height={vh(0.05)} padding={PADDING} title={CLOSE[`${language}`]} onPress={closeModelOnPressHandler} />
                </CardLayout>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    modalBackground: {
        height: vh(1),
        width: vw(1),
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: OPACITY_ZERO,
    },
    modalInner: {
        width: vw(0.8),
        backgroundColor: COLOR_HEADER,
        borderRadius: BORDER_RADIUS
    }
});
