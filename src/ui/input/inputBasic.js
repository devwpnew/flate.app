import { useEffect, useId, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  InputAccessoryView,
  Button,
  useWindowDimensions,
  DynamicColorIOS,
  Keyboard,
  Platform,
} from "react-native";
import tw from "../../../lib/tailwind";
import DText from "../text/dText";

const numberFormat = new Intl.NumberFormat("ru");

export default function InputBasic({
  name,
  keyboardType = "default",
  isNumberFormat,
  onChangeText,
  initialValue,
  leftTitle,
  rightTitle,
  topTitle,
  style = { ...tw`border border-greyborder rounded` },
  styleInput = {},
  ...props
}) {
  const { width } = useWindowDimensions();

  const inputAccessoryViewID = useId();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!initialValue) return;

    // // console.log("keyboardType", keyboardType, name, initialValue);

    if (keyboardType === "numeric") {
      const strValue = initialValue.toString();

      if (isNumberFormat) {
        setInputValue(numberFormat.format(strValue));
      } else {
        setInputValue(strValue);
      }

      if (onChangeText) {
        onChangeText({ value: strValue, name: name });
      }
    } else {
      setInputValue(initialValue);

      if (onChangeText) {
        onChangeText({ value: initialValue, name: name });
      }
    }
  }, [initialValue]);

  const handleInputChange = (v) => {
    if (keyboardType === "numeric") {
      let numericValue = v.replace(/[^0-9,.]/g, "");
      numericValue = numericValue.replace(/,/g, ".");

      const secondPart = numericValue.split(".");

      if (secondPart[1]?.length > 1) {
        return;
      }

      const numberFormattedNumericValue = numberFormat.format(numericValue);

      if (isNumberFormat) {
        setInputValue(numberFormattedNumericValue);
      } else {
        setInputValue(numericValue);
      }

      if (onChangeText) {
        onChangeText({ value: numericValue, name: name });
      }
    } else {
      setInputValue(v);

      if (onChangeText) {
        onChangeText({ value: v, name: name });
      }
    }
  };

  if (leftTitle || rightTitle) {
    styles.buttonText = {
      ...styles.buttonText,
      display: "flex",
      flexDirection: "row",
    };
  }

  let dynamicToolbarColor = "#d2d5db";

  if (Platform.OS === "ios") {
    dynamicToolbarColor = DynamicColorIOS({
      dark: "#292a2e",
      light: "#d2d5db",
    });
  }

  return (
    <View
      style={style ? { ...styles.buttonText, ...style } : styles.buttonText}
    >
      {leftTitle && (
        <DText style={tw`text-greyA0 text-sm opacity-60 py-[10px] pl-[10px]`}>
          {leftTitle}
        </DText>
      )}

      <TextInput
        style={{
          ...tw`w-full py-[10px] px-[10px] ${leftTitle && "pl-[1px]"}`,
          ...styleInput,
        }}
        keyboardType={keyboardType}
        onChangeText={handleInputChange}
        value={inputValue}
        returnKeyType={"done"}
        inputAccessoryViewID={inputAccessoryViewID}
        {...props}
      />

      {Platform.OS === "ios" && (
        <InputAccessoryView
          backgroundColor={dynamicToolbarColor}
          nativeID={inputAccessoryViewID}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",

              width: width,
              height: 42,
              paddingLeft: 15,
              paddingRight: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: "#AAAAAAFF",
            }}
          >
            <Button onPress={() => Keyboard.dismiss()} title="Скрыть" />
          </View>
        </InputAccessoryView>
      )}

      {rightTitle && (
        <DText
          style={tw`text-greyA0 text-sm opacity-60 ml-auto py-[10px] px-[10px]`}
        >
          {rightTitle}
        </DText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    width: "100%",
  },
});
