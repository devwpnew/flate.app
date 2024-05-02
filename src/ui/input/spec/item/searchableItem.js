import { useState } from "react";

import Checkbox from "expo-checkbox";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import Paragraph from "../../../text/paragraph";

import DropdownArrow from "../../../dropdown/icon/dropdownArrow";
import SearchableItemChild from "./searchableItemChild";

import { colors } from "../../../config";
import SearchableItemCheckboxMiddle from "./searchableItemCheckboxMiddle";

const getItemMultiselectStyle = (isHasCheck) => {
  let style = styles.itemMultiselect;

  if (!isHasCheck) {
    style = {
      ...style,
      backgroundColor: colors["white"],
    };
  }

  return style;
};

const getIsItemPartChecked = (selectedOptions, option) => {
  let count = 0;
  const children = option?.children;

  if (!children) {
    return;
  }

  const selectedIds = selectedOptions.map((op) => op.value);
  const childrenIds = children.map((op) => op.id);

  selectedIds.map((r) => {
    let check = childrenIds.includes(r);

    if (check) {
      count++;
    }
  });

  if (count === children.length || count > children.length) {
    return false;
  }

  if (count > 0) {
    return true;
  }

  return false;
};

const getIsItemChecked = (selectedOptions, option) => {
  if (!option || !option?.value) return;

  let check = false;
  const curOption = selectedOptions.find((op) => op.value == option.value);

  if (curOption) {
    check = true;
  }

  if (option.children) {
    option.children.map((option) => {
      const isChildActive = selectedOptions.find(
        (op) => op.value == option.value
      );

      if (isChildActive) {
        check = true;
      }
    });
  }

  return check;
};

export default function SearchableItem({
  multiselect = false,
  isHasCheck = true,
  isChecked = false,
  name,
  selectedOptions = [],
  option,
  onPress,
  color = "black",
}) {
  const itemMultiselectStyle = getItemMultiselectStyle(isHasCheck);

  const isPartChecked = getIsItemPartChecked(selectedOptions, option);
  const isItemChecked = getIsItemChecked(selectedOptions, option);

  const [isShow, setIsShow] = useState(false);

  const searchableItemOnPress = (name, pressedOption, parentOptionId) => {
    onPress({ name: name, value: pressedOption.id, parent: parentOptionId });
  };

  return (
    <>
      {option.children ? (
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => {
              searchableItemOnPress(name, option, null);
            }}
          >
            {isPartChecked ? (
              <SearchableItemCheckboxMiddle style={styles.checkbox} />
            ) : (
              <Checkbox
                pointerEvents="none"
                style={styles.checkbox}
                value={isItemChecked}
                color={isItemChecked ? colors["blue"] : colors["grey-medium"]}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.text}
            onPress={() => {
              if (!isHasCheck) {
                setIsShow((prev) => !prev);
              }
            }}
          >
            <Paragraph
              style={{
                fontFamily: isHasCheck
                  ? "Manrope_600SemiBold"
                  : "Manrope_700Bold",
              }}
              size={"md"}
              color={color}
            >
              {option.name}
            </Paragraph>

            <View style={styles.arrow}>
              <DropdownArrow isExpanded={isShow} />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            searchableItemOnPress(name, option, null);
            if (!isHasCheck) {
              setIsShow((prev) => !prev);
            }
          }}
          style={multiselect ? itemMultiselectStyle : styles.item}
        >
          {multiselect && isHasCheck ? (
            <Checkbox
              pointerEvents="none"
              style={styles.checkbox}
              value={isChecked}
              color={isChecked ? colors["blue"] : colors["grey-medium"]}
            />
          ) : (
            <></>
          )}
          <Paragraph
            style={{
              fontFamily: isHasCheck
                ? "Manrope_600SemiBold"
                : "Manrope_700Bold",
            }}
            size={"md"}
            color={color}
          >
            {option.name}
          </Paragraph>
        </TouchableOpacity>
      )}

      {isShow && option.children && (
        <>
          {option.children.map((option) => {
            return (
              <SearchableItemChild
                option={option}
                color={color}
                selectedOptions={selectedOptions}
                onPress={(option) => {
                  searchableItemOnPress(
                    option.name,
                    option,
                    option.parent_area.id
                  );
                }}
              />
            );
          })}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 35,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderBottomWidth: 1,
    borderColor: colors["grey-light"],
    backgroundColor: colors["white"],
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: colors["grey-light"],
    padding: 20,
  },
  itemMultiselect: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderBottomWidth: 1,
    borderColor: colors["grey-light"],
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  checkbox: {
    margin: 8,
    borderColor: colors["grey-dark"],
    borderWidth: 2,
  },
});
