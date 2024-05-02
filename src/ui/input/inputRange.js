import { View, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import tw from "../../../lib/tailwind";

import InputNum from "./inputNum";
import DText from "../text/dText";
import InputBasic from "./inputBasic";

export default function InputRange({
  initialValue,
  name,
  onChangeText,
  topTitle,
  style,
  isNumberFormat,
  ...props
}) {
  const [result, setResult] = useState({
    name: name,
    value: {},
  });

  const onRangeChange = (v) => {
    setResult((prev) => {
      const cur = { value: { ...result.value, ...v } };
      const merged = { ...prev, ...cur };
      return merged;
    });
  };

  useEffect(() => {
    onChangeText(result);
  }, [result]);

  return (
    <>
      <View
        style={style ? { ...styles.container, ...style } : styles.container}
      >
        {topTitle && <DText style={styles.topTitle}>{topTitle}</DText>}
        <>
          <InputBasic
            keyboardType="numeric"
            initialValue={initialValue?.from ? initialValue?.from : null}
            isNumberFormat={isNumberFormat}
            topTitle={topTitle ? topTitle : true}
            name="from"
            onChangeText={(v) => onRangeChange({ [v.name]: v.value })}
            style={{ width: "50%" }}
            inputStyle={tw`text-sm`}
            placeholder="от"
            {...props}
          />

          <InputBasic
            keyboardType="numeric"
            initialValue={initialValue?.to ? initialValue?.to : null}
            isNumberFormat={isNumberFormat}
            topTitle={topTitle ? topTitle : true}
            name="to"
            onChangeText={(v) => onRangeChange({ [v.name]: v.value })}
            style={tw.style("border-l border-greyborder", {
              width: "50%",
            })}
            inputStyle={tw`text-sm`}
            placeholder="до"
            {...props}
          />
        </>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    position: "relative",
    zIndex: 1,
    width: "100%",
  },
  topTitle: {
    position: "absolute",
    top: -8,
    left: 10,
    fontSize: 12,
    zIndex: 5,
    backgroundColor: "#fff",
    color: "#666666",
  },
});
