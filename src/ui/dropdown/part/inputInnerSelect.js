import { View, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import InputLoader from "./inputLoader";
import DropdownArrow from "../icon/dropdownArrow";

import { colors } from "../../config";
import { useEffect, useState } from "react";

const getPlaceholder = (placeholder) => {
  if (typeof placeholder == "string") {
    return placeholder ? { label: placeholder, value: "" } : "null";
  }

  if (placeholder && !placeholder.id) {
    return { label: placeholder.label, value: "" };
  }

  if (!placeholder) {
    return {};
  }

  return placeholder;
};

export default function InputInnerSelect({
  isCanRemoveSelected,
  isLoading,
  onOptionPress,
  items,
  isPlaceholder = true,
  placeholder,
  placeholderColor,
  placeholderSize,
  leftVariant,
  onOpen,
  isArrowExpanded,
  value,
}) {
  const placeholderFormatted = getPlaceholder(placeholder);

  const [selected, setSelected] = useState(value);

  // console.log(selected, 'selected');

  const handleSelect = (value) => {
    const selectedItem = items.find((item) => item.value == value);
    if (selectedItem && onOptionPress) {
      onOptionPress({ id: selectedItem.value, name: selectedItem.label });
    } else {
      if (isCanRemoveSelected) {
        onOptionPress(placeholderFormatted);
      }
    }
  };

  useEffect(() => {
    if (Platform.OS == "ios") {
      setSelected(value);
      handleSelect(value);
    }
  }, [value]);

  useEffect(() => {
    if (Platform.OS == "android") {
      setSelected(selected);
      handleSelect(selected);
    }
  }, [selected]);

  const handleChangeSelect = (id) => {
    if (isPlaceholder) {
      setSelected(id);
      // handleSelect(id);
    } else {
      if (!id) {
        setSelected(value);
      } else {
        setSelected(id);
      }
    }
    // if (id) {
    //   setSelected(id);
    // } else {
    //   setSelected(value);
    //   handleSelect(value);
    // }
  };

  const handleClose = () => {
    if (isPlaceholder) {
      setSelected(selected);
      handleSelect(selected);
    } else {
      if (!selected) {
        setSelected(value);
      } else {
        setSelected(selected);
        handleSelect(selected);

        console.log(selected, "selected");
      }
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
        }}
      >
        <>
          {items && items.length > 0 && (
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              doneText="Применить"
              onValueChange={handleChangeSelect}
              onDonePress={handleClose}
              onClose={handleClose}
              items={items}
              value={selected}
              placeholder={placeholderFormatted}
              // placeholder={{}}
              style={{
                placeholder: {
                  color: colors[placeholderColor],
                  fontSize: placeholderSize === "lg" ? 16 : 14,
                  // fontWeight: 600,
                  // paddingTop: 14,
                  // paddingBottom: 14,
                },
                inputIOS: {
                  color: colors[placeholderColor],
                  fontSize: placeholderSize === "lg" ? 16 : 14,
                  fontWeight: "500",
                  fontFamily: "Manrope_500Medium",
                  paddingTop: 14,
                  paddingBottom: 14,
                },
                inputAndroid: {
                  color: colors[placeholderColor],
                  fontSize: placeholderSize === "lg" ? 16 : 14,
                  fontWeight: "500",
                  fontFamily: "Manrope_500Medium",
                  paddingTop: 9,
                  paddingBottom: 9,
                },
              }}
              onOpen={onOpen}
              Icon={() => {
                return (
                  <DropdownArrow
                    style={{ marginTop: 20 }}
                    isExpanded={isArrowExpanded}
                  />
                );
              }}
            />
          )}
        </>
      </View>
    </>
  );
}
