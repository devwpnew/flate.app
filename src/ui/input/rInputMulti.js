import { View, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import Paragraph from "../text/paragraph";
import RInput from "./rInput";

const resultToString = (obj) => {
  let string = "";
  for (const prop in obj) {
    string = string + obj[prop] + "\n";
  }

  return string;
};

export default function RInputMulti({
  initialValue,
  arValues,
  ext,
  text,
  name,
  onChangeText,
  ...props
}) {
  const [result, setResult] = useState({
    root: "",
  });
  const [inputs, setInputs] = useState(arValues);

  const onChangeTextMulti = (v, id) => {
    setResult((prevResult) => {
      const copied = { ...prevResult };
      copied[id] = v.value;

      return copied;
    });
  };

  useEffect(() => {
    const resultString = resultToString(result);
    onChangeText({ value: resultString, name: name });
  }, [result]);

  return (
    <>
      <RInput editable={false} initialValue={initialValue} onChangeText={(v) => onChangeTextMulti(v, "root")} {...props} />

      {inputs.length > 0 && (
        <View style={styles.container}>
          {inputs.map((id, i) => {
            return (
              <RInput
                key={id}
                initialValue={arValues[i]}
                onChangeText={(v) => onChangeTextMulti(v, id)}
                {...props}
              />
            );
          })}
        </View>
      )}

      {/* <TouchableOpacity
        onPress={() =>
          setInputs((prevInputs) => [
            ...prevInputs,
            `child-${Math.random() * 1000}`,
          ])
        }
      >
        <Paragraph style={{ textAlign: "center" }} color="blue">
          {text}
        </Paragraph>
      </TouchableOpacity> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", gap: 20 },
});
