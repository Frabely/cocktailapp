import {StyleSheet, Text, View} from "react-native";
import StyledButton from "../layout/StyledButton";
import {vw} from "../../functions/dimentions";
import CardLayout from "../layout/CardLayout";
import {NO_HITS_LABEL, RESET_FILTER_LABEL} from "../../constants/labels";
import {useAppSelector} from "../../constants/hooks";
import {MARGIN, PADDING} from "../../constants/style_constants";

export default function NoHits({onClearAllFiltersClickHandler}: NoHitsProps) {
    const state = useAppSelector((state) => state)
    const language: string = state.language

    return (
        <View style={styles.noHits}>
            <CardLayout width={vw(0.5)}>
                    <Text style={styles.text}>{`${NO_HITS_LABEL[`${language}`]} 😕`}</Text>
                    <StyledButton
                        flex={1}
                        title={RESET_FILTER_LABEL[`${language}`]}
                        onPress={onClearAllFiltersClickHandler}
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
    onClearAllFiltersClickHandler: (() => void)
}

