import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import Paragraph from "../text/paragraph";

import InputRangeSide from "./part/inputRangeSide";

export default function RInputRange({
  initialValue,
  name,
  onChangeText,
  topTitle,
  style,
  isNumberFormat,
  isValid = true,
  isSuccess,
  ...props
}) {
  const [result, setResult] = useState({
    name: name,
    value: {
      from: initialValue?.from || null,
      to: initialValue?.to || null,
    },
  });
  

  useEffect(() => {
    const merged = {
      from: result.value.from,
      to: result.value.to,
    };

    if (!merged.to) {
      delete merged.to;
    }

    if (!merged.from) {
      delete merged.from;
    }

    onChangeText({
      name: name,
      value: merged,
    });

  }, [result]);

  const handleInput = (v) => {
    setResult((prev) => {
      return {
        ...prev,
        value: {
          ...prev.value,
          [v.name]: v.value,
        },
      };
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ width: "49%" }}>
          <InputRangeSide
            setResult={setResult}
            sideValue={result?.value?.from}
            isSuccess={isSuccess?.from}
            isValid={isValid}
            keyboardType="numeric"
            initialValue={initialValue?.from ? initialValue?.from : null}
            isNumberFormat={isNumberFormat}
            name={name}
            onChangeText={handleInput}
            type={"from"}
            style={style}
            {...props}
          />
        </View>

        <View style={{ width: "49%" }}>
          <InputRangeSide
            setResult={setResult}
            sideValue={result?.value?.to}
            isSuccess={isSuccess?.to}
            isValid={isValid}
            keyboardType="numeric"
            initialValue={initialValue?.to ? initialValue?.to : null}
            isNumberFormat={isNumberFormat}
            name={name}
            onChangeText={handleInput}
            type={"to"}
            style={style}
            {...props}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
