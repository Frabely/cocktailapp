import {ColorValue, Pressable, StyleSheet, Text} from "react-native";
import {
    BORDER_RADIUS,
} from "../../../constants/style_constants";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {IconTitleObject} from "../../../constants/types";
import {ICON_NAME_LIST} from "../../../constants/filter_lists";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function FilterButton(
    {
        state, titleENG, onClick, title, isIcon, colorActive, colorInactive,
        padding, width, margin, height, flex
    }: FilterButtonProps) {
    const [isTouched, setIsTouched] = useState(false)
    let isClicked = state.includes(titleENG)
    const onClickHandler = () => {
        onClick(titleENG)
    }
    let icon: string | IconProp = title
    if (isIcon) {
        ICON_NAME_LIST.forEach((stateItem: IconTitleObject) => {
            if (stateItem.titleENG === titleENG)
                icon = stateItem.icon
        })
    }

    return (
        <Pressable onPress={onClickHandler}
                   onTouchStart={() => {
                       setIsTouched(true)
                   }}
                   onTouchEnd={() => {
                       setIsTouched(false)
                   }}
                   style={[
                       styles.outerButton,
                       {
                           backgroundColor: (isClicked || isTouched) ? colorActive : colorInactive,
                           height: (height || height === 0) ? height : undefined,
                           padding: (padding || padding === 0) ? padding : undefined,
                           margin: (margin || margin === 0) ? margin : undefined,
                           width: (width || width === 0) ? width : undefined,
                           flex: (flex || flex === 0) ? flex : undefined,
                       },
                   ]}>
            {typeof icon === "string" ?
                <Text style={{textAlign: "center"}}>{title}</Text> :
                <FontAwesomeIcon icon={icon}/>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerButton: {
        borderRadius: BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
    }
})

export type FilterButtonProps = {
    state: string[],
    titleENG: string,
    onClick: ((...args: any) => any),
    title: string,
    colorActive: ColorValue,
    colorInactive: ColorValue,
    isIcon: boolean,
    padding?: number | undefined,
    margin?: number | undefined,
    width?: string | number | null,
    flex?: number | undefined,
    height?: string | number | undefined,
}
