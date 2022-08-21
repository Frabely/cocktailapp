import {StyleSheet, Text} from "react-native";
import React from "react";

export default function HeadLine({label, margin}: HeadLineProps) {
    return (
        <Text style={[styles.headLine, {
            margin: (margin || margin == 0)  ? margin : undefined,
        }]}>{label}</Text>
    )
}

const styles = StyleSheet.create({
    headLine: {
        fontSize: 40,
    },
})

export type HeadLineProps = {
    label: string,
    margin?: number
}

