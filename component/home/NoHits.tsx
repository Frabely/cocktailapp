import {StyleSheet, Text, View} from "react-native";
import StyledButton from "../layout/StyledButton";
import {vw} from "../../functions/dimentions";
import CardLayout from "../layout/CardLayout";
import {NO_HITS_LABEL, RESET_FILTER_LABEL} from "../../constants/labels";
import {useAppSelector} from "../../constants/hooks";

export default function NoHits(props: any) {
    const state = useAppSelector((state) => state)
    const language: string = state.language

    return (
        <View style={styles.noHits}>
            <CardLayout width={vw(0.5)}>
                    <Text style={{fontWeight: '900'}}>{`${NO_HITS_LABEL[`${language}`]} 😕`}</Text>
                    <StyledButton width={'100%'}
                                  title={RESET_FILTER_LABEL[`${language}`]}
                                  onPress={props.onClearAllFiltersClickHandler}/>
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
})
