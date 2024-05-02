import { useMemo } from "react";
import Checkbox from "expo-checkbox";

import { StyleSheet, TouchableOpacity } from "react-native";
import Paragraph from "../../../text/paragraph";

import { colors } from "../../../config";

export default function SearchableItemChild({
  option,
  color,
  onPress,
  selectedOptions,
}) {
  const isChecked = useMemo(() => {
    return selectedOptions.find((op) => op.value == option.id);
  }, [selectedOptions]);

  return (
    <>
      <TouchableOpacity
        onPress={() => onPress(option)}
        style={{
          ...styles.itemMultiselect,
          backgroundColor: colors["white"],
        }}
      >
        <Checkbox
          pointerEvents="none"
          style={{ ...styles.checkbox, marginLeft: 40 }}
          value={isChecked}
          color={isChecked ? colors["blue"] : colors["grey-medium"]}
        />

        <Paragraph
          style={{
            fontFamily: "Manrope_500Medium",
          }}
          size={"md"}
          color={color}
        >
          {option.name}
        </Paragraph>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
