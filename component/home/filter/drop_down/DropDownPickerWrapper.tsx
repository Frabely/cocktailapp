import {BORDER_RADIUS, MARGIN, PADDING} from "../../../../constants/style_constants";
import {
    COLOR_BACKGROUND,
    COLOR_HEADER,
    COLOR_CARD_BACKGROUND
} from "../../../../constants/color_styles";
import DropDownPicker from "react-native-dropdown-picker";
import {useEffect, useState} from "react";
import {vh_reactive, vw_reactive} from "../../../../functions/dimentions";
import {Platform} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../../constants/hooks";
import {changeIngredients} from "../../../../reducers/filter/ingredientsFilterReducer";
import {
    INGREDIENTS_FILTER_SELECTION_NUMBER_MAX,
    INGREDIENTS_FILTER_SELECTION_NUMBER_MIN
} from "../../../../constants/const_vars";
import { Orientation } from "expo-screen-orientation";
import {getDefaultButtonHeight} from "../../../../functions/viewport_calculations";
import {DropDownMenuType, Ingredient, Language} from "../../../../constants/types";

export default function DropDownPickerWrapper() {
    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => state)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(state.ingredientsFilter);
    const language: Language = state.language

    const createIngredientsArray = () => {
        let dropdownIngredientsList: DropDownMenuType[] = []
        state.ingredientDataSet.map((ingredient: Ingredient) => {
            const dropdownItem: DropDownMenuType = {
                label: language.ingredients[`${ingredient.idIngredient}`].name,
                value: language.ingredients[`${ingredient.idIngredient}`]
            }
            dropdownIngredientsList.push(dropdownItem)
        })
        return dropdownIngredientsList
    }

    const [items, setItems] = useState(createIngredientsArray());
    useEffect(() => {
        dispatch(changeIngredients(value))
    }, [value])

    useEffect(() => {
        setValue(state.ingredientsFilter)
    }, [state.ingredientsFilter])

    DropDownPicker.setMode("BADGE");
    DropDownPicker.setListMode("SCROLLVIEW");

    return (
        <DropDownPicker
            // TODO add category to list (parent key) see docs
            // TODO https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/advanced/category
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={true}
            min={INGREDIENTS_FILTER_SELECTION_NUMBER_MIN}
            max={INGREDIENTS_FILTER_SELECTION_NUMBER_MAX}
            flatListProps={{
                initialNumToRender: 10
            }}
            placeholder={''}
            placeholderStyle={{
                height: 0
            }}
            searchable={true}
            searchPlaceholder={language.labels.SEARCH_INGREDIENTS_LABEL}
            searchContainerStyle={{
                backgroundColor: COLOR_BACKGROUND,
                borderRadius: BORDER_RADIUS / 2,
                margin: MARGIN / 2,
            }}
            searchTextInputStyle={{
                backgroundColor: COLOR_CARD_BACKGROUND,
                borderWidth: 0,
                borderRadius: BORDER_RADIUS / 2,
                padding: PADDING / 2
            }}
            searchTextInputProps={{
                maxLength: 25,
                selectTextOnFocus: true
            }}
            dropDownContainerStyle={{
                width: '100%',
                backgroundColor: COLOR_HEADER,
                padding: PADDING,
                borderWidth: 0,
                borderRadius: BORDER_RADIUS / 2,
                overflow: 'hidden',
                marginBottom: MARGIN * 4,
            }}
            listItemContainerStyle={{
                alignItems: 'center',
                backgroundColor: COLOR_BACKGROUND,
                padding: PADDING / 2,
                margin: MARGIN / 2,
                borderRadius: BORDER_RADIUS / 2
            }}
            listItemLabelStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlignVertical: 'center'
            }}
            selectedItemContainerStyle={{
                backgroundColor: COLOR_CARD_BACKGROUND,
            }}
            selectedItemLabelStyle={{
                fontWeight: "bold"
            }}
            itemSeparatorStyle={{
                backgroundColor: COLOR_HEADER
            }}
            showArrowIcon={true}
            showTickIcon={false}
            dropDownDirection="TOP"
            disableBorderRadius={false}
            autoScroll={true}
            containerStyle={{
                backgroundColor: COLOR_CARD_BACKGROUND,
                width: vw_reactive(1, state.dimensions.width) - 2 * PADDING,
                borderBottomRightRadius: BORDER_RADIUS / 2,
                borderBottomLeftRadius: BORDER_RADIUS / 2,
                marginLeft: MARGIN,
                marginRight: MARGIN,
            }}
            modalContentContainerStyle={{
                backgroundColor: COLOR_HEADER
            }
            }
            labelStyle={{
                fontWeight: "bold"
            }}
            // onSelectItem={(itemArray) => {
            //     console.log(itemArray);
            // }}
            // onChangeValue={(value) => {
            //     console.log(value);
            // }}
            maxHeight={300}
            // arrowIconStyle={{
            //     margin: MARGIN,
            //     width: vw_reactive(0.1),
            //     height: vh_reactive(0.03),
            // }}
            arrowIconStyle={(state.dimensions.orientationInfo === Orientation.PORTRAIT_UP) ? {
                margin: MARGIN,
                height: vh_reactive(0.03, state.dimensions.height),
                width: vw_reactive(0.1, state.dimensions.width),
            } : {
                margin: MARGIN,
                height: vh_reactive(0.1, state.dimensions.height),
                width: vw_reactive(0.03, state.dimensions.width),
            }}
            badgeStyle={{
                height: vh_reactive(getDefaultButtonHeight(state.dimensions.orientationInfo), state.dimensions.height),
                borderRadius: BORDER_RADIUS / 2,
                justifyContent: 'center',
                paddingVertical: 0,
                paddingHorizontal: PADDING / 2
            }}
            badgeColors={COLOR_HEADER}
            badgeTextStyle={{
                textAlign: 'center',
            }}
            extendableBadgeContainer={true}
            showBadgeDot={false}
            listMode={(Platform.OS === 'web' ? 'FLATLIST' : 'MODAL')}
            /*Results container*/
            style={{
                backgroundColor: 'rgba(255,255,255,0)',
                padding: PADDING / 2,
                borderWidth: 0,
                borderRadius: BORDER_RADIUS / 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        />
    )
}
