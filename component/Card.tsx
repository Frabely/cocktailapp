import {ImageBackground, StyleSheet, Text, View} from "react-native";

export default function Card(props: any) {
    let isHighlighted = props.item.idDrink === props.isImageClicked

    const onImageClickHandler = () => {
        if (isHighlighted) {
            props.setIsImageClicked('')
            return
        }
        props.setIsImageClicked(props.item.idDrink)
    }
    return (
        <View onTouchStart={onImageClickHandler}
              style={isHighlighted ? styles.cardHighlight : styles.cardOuter}>
            <ImageBackground style={styles.cardInner} source={props.item.strDrinkThumb}>
                {isHighlighted &&
                    <>
                        <View style={styles.innerImageCard}>
                            <ImageBackground style={styles.innerImage}
                                             source={props.item.strDrinkThumb}></ImageBackground>
                        </View>
                        <View style={styles.cardHighlightBackground}>
                            <View style={{flex: 4}}></View>
                            <Text style={{fontSize: 40}}>
                                {props.item.strDrink}
                            </Text>
                            <Text style={{fontWeight: 'bold'}}>
                                {props.item.strInstructionsDE}
                            </Text>
                            <Text>
                                - {props.item.strIngredient1} {props.item.strMeasure1}
                            </Text>
                            <Text>
                                - {props.item.strIngredient2} {props.item.strMeasure2}
                            </Text>
                            <Text>
                                - {props.item.strIngredient3} {props.item.strMeasure3}
                            </Text>
                            <View style={{flex: 1}}></View>
                        </View>

                    </>
                }
                {!isHighlighted &&
                    <>
                        <Text style={styles.letter}>{props.item.strDrink}</Text>
                        <Text style={styles.test}>{props.item.strCategory}</Text>
                    </>
                }
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    innerImageCard: {
        position: 'absolute',
        zIndex: 1,
        start: 0,
        top: 0,
        padding: 4,
        margin: 10,
        border: 0,
        height: '30%',
        width: '50%',
        backgroundColor: 'rgb(96,72,45)',
        borderWidth: 1,
        borderRadius: 30,
    },
    innerImage: {
        height: '100%',
        width: '100%',
        borderRadius: 25,
        overflow: 'hidden',
    },
    cardHighlightBackground: {
        height: '80%',
        width: '80%',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.60)',
        borderRadius: 25,
    },
    cardHighlight: {
        width: '100%',
        height: '90vh',
        padding: 10,
    },
    cardOuter: {
        width: '33.333333%',
        height: '25vh',
        padding: 10,
    },
    cardInner: {
        alignItems: "center",
        justifyContent: 'center',
        height: '100%',
        borderRadius: 25,
        overflow: 'hidden'
    },
    letter: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        fontSize: 10,
    },
    test: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        fontSize: 7
    }
});
