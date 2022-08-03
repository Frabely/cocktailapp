import React from "react";
import {Platform, StyleSheet, View} from "react-native";
import {AdMobBanner} from "expo-ads-admob";
import {vh} from "../functions/dimentions";
import {BORDER_RADIUS, PADDING} from "../constants/style_constants";

export default function BannerAd() {
    const unitID = Platform.select({
        ios: "ca-app-pub-2825578775814315~7665719836",
        android: "ca-app-pub-2825578775814315~7665719836",
    })

    return (
        <View style={styles.cardOuter}>
            <View style={styles.cardInner}>
                <AdMobBanner
                    adUnitID={unitID}
                    bannerSize={"banner"}
                    servePersonalizedAds={true}
                    style={{
                        padding: 30,
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardOuter: {
        flex: 1,
        height: vh(0.20),
        padding: PADDING,
    },
    cardInner: {
        flex: 1,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
    },
})
