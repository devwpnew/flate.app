import { useState } from "react";
import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { colors } from "../../config";
import { View } from "react-native";

import RInput from "../rInput";

export default function RInputPhone({
  initialValue,
  onChangeText,
  style = {},
  ...props
}) {
  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");

  const changePhoneHandler = (v) => {
    const text = v.value;
    const rawText = v.value.replace(/[^0-9]/g, '');

    setMaskedValue(text);
    setUnmaskedValue(rawText);

    if (onChangeText) {
      onChangeText({
        text: text,
        rawText: rawText,
      });
    }
  };

  return (
    <RInput mask="phone" onChangeText={changePhoneHandler} {...props} />
  );
}

const styles = StyleSheet.create({
  input: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  container: {
    shadowColor: "#6F7882",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2, // для Android
  },
});
