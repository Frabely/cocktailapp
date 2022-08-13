import {StyleSheet, Text, View} from "react-native";
import StyledButton from "../layout/StyledButton";
import {vw} from "../../functions/dimentions";
import CardLayout from "../layout/CardLayout";

export default function NoHits(props: any) {
    return (
        <View style={styles.noHits}>
            <CardLayout width={vw(0.5)}>
                    <Text style={{fontWeight: '900'}}>No Hits 😕</Text>
                    <StyledButton width={'100%'} title={'Reset Filter'}
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
