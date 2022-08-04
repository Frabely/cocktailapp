import {BORDER_RADIUS, MARGIN, PADDING} from "../../../constants/style_constants";
import {COLOR_BACKGROUND, COLOR_HEADER, LABEL_BACKGROUND} from "../../../constants/color_styles";
import DropDownPicker from "react-native-dropdown-picker";
import {useState} from "react";
import {INGREDIENT_LIST} from "../../../constants/filter_lists";
import {vh, vw} from "../../../functions/dimentions";

export default function DropDownPickerWrapper() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState(INGREDIENT_LIST);

    DropDownPicker.setMode("BADGE");

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
            min={0}
            max={3}
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
                marginBottom: MARGIN * 5,
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
            // badgeStyle={{
            //     padding: 5
            // }}
            disableBorderRadius={false}
            autoScroll={true}
            containerStyle={{
                backgroundColor: LABEL_BACKGROUND,
                // TODO fix vw(0.947) to vw(1) if possible (maintainable)
                width: vw(0.947),
                borderBottomRightRadius: BORDER_RADIUS / 2,
                borderBottomLeftRadius: BORDER_RADIUS / 2,
                marginLeft: MARGIN,
                marginRight: MARGIN,
            }}
            labelStyle={{
                fontWeight: "bold"
            }}
            onSelectItem={(itemArray) => {
                // console.log(itemArray);
            }}
            onChangeValue={(value) => {
                // console.log(value);
            }}
            maxHeight={300}
            arrowIconStyle={{
                padding: PADDING,
                margin: MARGIN,
                //TODO fix very bad hard coded position
                width: vw(0.1),
                height: vh(0.03),
                alignSelf: 'center'
            }}
            badgeStyle={{
                width: '100%',
                padding: PADDING / 2,
                marginLeft: MARGIN / 2,
                marginRight: MARGIN / 2,
                borderRadius: BORDER_RADIUS / 2,
            }}
            badgeColors={COLOR_HEADER}
            badgeTextStyle={{
                textAlign: 'center'
            }}
            extendableBadgeContainer={true}
        />
    )
}
