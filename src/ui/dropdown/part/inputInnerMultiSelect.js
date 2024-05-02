import { TouchableOpacity, StyleSheet } from "react-native";

import InputLoader from "./inputLoader";

import Paragraph from "../../text/paragraph";
import DropdownArrow from "../icon/dropdownArrow";

export default function InputInnerMultiSelect({
  options,
  isLoading,
  style,
  loaderVariant,
  placeholder,
  placeholderColor,
  placeholderSize,
  isArrowExpanded,
  ...props
}) {
  return (
    <>
      <TouchableOpacity style={{ ...style, ...styles.input }} {...props}>
        <>
          <Paragraph
            color={placeholderColor}
            style={{
              // fontFamily: "Manrope_400Regular",
              fontSize: placeholderSize > 0 ? placeholderSize : 14,
            }}
            // size={placeholderSize}
          >
            {placeholder}
          </Paragraph>
          <DropdownArrow isExpanded={isArrowExpanded} />
        </>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12.3,
    paddingBottom: 12.3,
  },
});
