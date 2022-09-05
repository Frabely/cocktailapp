import {DEFAULT_FILTER_BUTTON_HEIGHT} from "../constants/style_constants";
import {Orientation} from "expo-screen-orientation";

export const getDefaultButtonHeight = (orientation: number) => {
    return orientation === Orientation.LANDSCAPE_LEFT || orientation === Orientation.LANDSCAPE_RIGHT ?
        DEFAULT_FILTER_BUTTON_HEIGHT*2.1 :
        DEFAULT_FILTER_BUTTON_HEIGHT

}
