import {BORDER_RADIUS, DEFAULT_BUTTON_HEIGHT, MARGIN, PADDING} from "../../../constants/style_constants";
import {COLOR_BACKGROUND, COLOR_HEADER, LABEL_BACKGROUND} from "../../../constants/color_styles";
import DropDownPicker from "react-native-dropdown-picker";
import {useEffect, useState} from "react";
import {INGREDIENT_LIST} from "../../../constants/filter_lists";
import {vh, vw} from "../../../functions/dimentions";
import {Platform} from "react-native";
import {useAppDispatch} from "../../../constants/hooks";
import {changeIngredients} from "../../../reducers/Filter/ingredientsFilterReducer";
import {
    INGREDIENTS_FILTER_SELECTION_NUMBER_MAX,
    INGREDIENTS_FILTER_SELECTION_NUMBER_MIN
} from "../../../constants/const_vars";

export default function DropDownPickerWrapper(props: any) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(INGREDIENT_LIST);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(changeIngredients(props.ingredientsValue))
    }, [props.ingredientsValue])


    DropDownPicker.setMode("BADGE");
    DropDownPicker.setListMode("SCROLLVIEW");

    return (
        <DropDownPicker
            // TODO add category to list (parent key) see docs
            // TODO https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/advanced/category
            open={open}
            value={props.ingredientsValue}
            items={items}
            setOpen={setOpen}
            setValue={props.setIngredientsValue}
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
            searchPlaceholder="Search Ingredients"
            searchContainerStyle={{
                backgroundColor: COLOR_BACKGROUND,
                borderRadius: BORDER_RADIUS / 2,
                margin: MARGIN / 2,
            }}
            searchTextInputStyle={{
                backgroundColor: LABEL_BACKGROUND,
                borderWidth: 0,
                borderRadius: BORDER_RADIUS / 2,
                padding: PADDING / 2
            }}
            searchTextInputProps={{
                maxLength: 25,
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
            // itemSeparator={true}
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
                backgroundColor: LABEL_BACKGROUND,
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
                backgroundColor: LABEL_BACKGROUND,
                width: vw(1) - 2 * PADDING,
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
            arrowIconStyle={{
                // padding: PADDING,
                margin: MARGIN,
                width: vw(0.1),
                height: vh(0.03),
            }}
            badgeStyle={{
                height: vh(DEFAULT_BUTTON_HEIGHT),
                width: vw(0.9) - 4 * PADDING - 2 * MARGIN,
                borderRadius: BORDER_RADIUS / 2,
                justifyContent: 'center'
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
