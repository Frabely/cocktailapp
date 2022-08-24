import { Dimensions } from 'react-native';

const width: number = (Dimensions.get('window').width);
const height: number = (Dimensions.get('window').height);

export const vw = (multiplier: number) => {
    return width * multiplier
}
export const vh = (multiplier: number) => {
    return height * multiplier
}

export const vw_reactive = (multiplier: number, width: number) => {
    return width * multiplier
}
export const vh_reactive = (multiplier: number, height: number) => {
    return height * multiplier
}

