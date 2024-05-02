import { useState } from "react";
import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

export default function InputPhone({
  initialValue,
  onChangeText,
  style = {},
  ...props
}) {
  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");

  const changePhoneHandler = (text, rawText) => {
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
    <>
      <MaskedTextInput
        style={style ? { ...style, ...styles.input } : styles.input}
        mask="+7 (999) 999-99-99"
        onChangeText={changePhoneHandler}
        keyboardType="numeric"
        {...props}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
  },
});
