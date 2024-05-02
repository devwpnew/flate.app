import { useEffect, useId, useState, useRef } from "react";
import { TextInput } from "react-native";

import { MaskedTextInput } from "react-native-mask-text";
import { useFocusEffect } from "@react-navigation/native";

import InputSide from "../dropdown/part/inputSide";
import AccessoryView from "./part/accessoryView";
import Paragraph from "../text/paragraph";

const numberFormat = new Intl.NumberFormat("ru");

export const getKeyboardEnterButton = () => {
  let keyboardEnterButton = "done";

  // if (!returnKeyType && keyboardType) {
  //   keyboardEnterButton = "search";
  // } else {
  //   keyboardEnterButton = "done";
  // }
  return keyboardEnterButton;
};

export default function RInputBasic({
  name,
  keyboardType = "default",
  isNumberFormat,
  onChangeText,
  onBeforeChangeText,
  initialValue,
  leftTitle,
  rightTitle,
  topTitle,
  returnKeyType,
  enterKeyHint,
  defaultValue,
  mask,
  leftWidth = 80,
  left = null,
  rightWidth = 80,
  right = null,
  getRef,
  isRequired,
  ...props
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (getRef) {
      getRef(inputRef);
    }
  }, [inputRef?.current]);

  const keyboardEnterButton = getKeyboardEnterButton();

  const inputAccessoryViewID = useId();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!initialValue) return;

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
        setInputValue(
          numberFormattedNumericValue == 0 ? "" : numberFormattedNumericValue
        );
      } else {
        setInputValue(numericValue);
      }

      if (onChangeText) {
        onChangeText({ value: numericValue, name: name });
      }
    } else {
      const value = onBeforeChangeText ? onBeforeChangeText(v) : v;

      setInputValue(value);

      if (onChangeText) {
        onChangeText({ value: value, name: name });
      }
    }
  };

  return (
    <>
      {isRequired && (
        <>
          <Paragraph
            style={{ position: "absolute", top: 15, left: 21 }}
            size="md"
            color="red"
          >
            *
          </Paragraph>
          <Paragraph size="md" color="red">
            {"  "}
          </Paragraph>
        </>
      )}

      <InputSide
        inputRef={inputRef}
        variant="left"
        side={left}
        width={leftWidth}
      />

      {mask === "phone" ? (
        <MaskedTextInput
          ref={inputRef}
          onChangeText={handleInputChange}
          value={inputValue}
          enterKeyHint={enterKeyHint}
          returnKeyType={keyboardEnterButton}
          inputAccessoryViewID={inputAccessoryViewID}
          keyboardType="numeric"
          mask="+7 (999) 999-99-99"
          {...props}
        />
      ) : (
        <TextInput
          ref={inputRef}
          onChangeText={handleInputChange}
          value={inputValue}
          enterKeyHint={enterKeyHint}
          returnKeyType={keyboardEnterButton}
          keyboardType={keyboardType}
          inputAccessoryViewID={inputAccessoryViewID}
          {...props}
        />
      )}

      <InputSide
        inputRef={inputRef}
        variant="right"
        side={right}
        width={rightWidth}
      />

      <AccessoryView inputAccessoryViewID={inputAccessoryViewID} />
    </>
  );
}
