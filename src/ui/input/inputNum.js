import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import InputBasic from "./inputBasic";
import DText from "../text/dText";

const numberFormat = new Intl.NumberFormat("ru");

export default function InputNum({
  initialValue,
  inputStyle,
  style,
  isNumberFormat,
  onChangeText,
  topTitle,
  ...props
}) {
  const [inputValue, setInputValue] = useState("");

  // // console.log(style);

  const handleInputChange = (text) => {
    let numericValue = text.replace(/[^0-9]/g, "");

    if (isNumberFormat) {
      numericValue = numberFormat.format(numericValue);
    }

    setInputValue(numericValue);

    if (onChangeText) {
      const noSpaces = numericValue.replace(/\s/g, "");

      onChangeText(noSpaces);
    }
  };

  useEffect(() => {
    if (initialValue) {
      const formatValue = numberFormat.format(initialValue);
      setInputValue(formatValue);
    }
  }, [initialValue]);

  return (
    <View
      style={
        style
          ? {
              ...style,
            }
          : {
              ...styles.container,
            }
      }
    >
      {topTitle && <DText style={styles.topTitle}>{topTitle}</DText>}

      <InputBasic
        value={inputValue}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        style={inputStyle}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    position: "relative",
    zIndex: 1,
  },
  topTitle: {
    position: "absolute",
    top: -6,
    left: 10,
    fontSize: 12,
    zIndex: 5,
    backgroundColor: "#fff",
    color: "#666666",
  },
});
