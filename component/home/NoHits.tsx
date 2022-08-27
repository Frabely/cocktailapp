import {StyleSheet, Text, View} from "react-native";
import StyledButton from "../layout/StyledButton";
import {vw_reactive} from "../../functions/dimentions";
import CardLayout from "../layout/CardLayout";
import {NO_HITS_LABEL, RESET_FILTER_LABEL} from "../../constants/labels";
import {useAppSelector} from "../../constants/hooks";
import {MARGIN, PADDING} from "../../constants/style_constants";

export default function NoHits({onPress}: NoHitsProps) {
    const state = useAppSelector((state) => state)
    const language: string = state.language

    return (
        <View style={styles.noHits}>
            <CardLayout width={vw_reactive(0.5, state.dimensions.width)}>
                    <Text style={styles.text}>{`${NO_HITS_LABEL[`${language}`]} 😕`}</Text>
                    <StyledButton
                        title={RESET_FILTER_LABEL[`${language}`]}
                        onPress={onPress}
                        padding={PADDING}
                        margin={MARGIN / 2}/>
            </CardLayout>
        </View>
    )
}
const styles = StyleSheet.create({
    noHits: {
        height: '50%',
        alignItems: "center",
        justifyContent: "flex-end",
    },
    text: {
        fontWeight: '900',
        textAlign: 'center'
    }
})

export type NoHitsProps = {
    onPress: (({...args}: any) => any)
}

