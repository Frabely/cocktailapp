import {IconTitleObject, LabelListType} from "./types";
import {faSortAlphaUp, faSortAlphaDown, faHeart} from "@fortawesome/free-solid-svg-icons";

export const SORT_LIST: LabelListType = {
    en: ['AlphabeticalAZ', 'AlphabeticalZA', 'Favorites'],
    de: ['AlphabetischAZ', 'AlphabetischZA', 'Favoriten']
}

export const ICON_NAME_LIST: IconTitleObject[] = [
    {icon: faSortAlphaDown, titleENG: 'alphabeticalAZ'},
    {icon: faSortAlphaUp, titleENG: 'alphabeticalZA'},
    {icon: faHeart, titleENG: 'favorites'}
]
