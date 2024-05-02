import { StyleSheet } from "react-native";

import InputBasic from "./inputBasic";
import { View } from "react-native";
import tw from "../../../lib/tailwind";
import DText from "../text/dText";

export default function InputArea({
  height = 100,
  style,
  areaStyle,
  topTitle,
  required,
  ...props
}) {
  return (
    <View
      style={
        style
          ? {
              ...tw`border border-greyborder rounded h-[${height}px] w-full relative`,
              ...style,
            }
          : tw`border border-greyborder rounded h-[${height}px] w-full relative`
      }
    >
      {topTitle && (
        <DText style={styles.topTitle}>
          {topTitle}
          {required && <DText style={tw`text-red`}>*</DText>}
        </DText>
      )}

      <InputBasic
        style={{ height: "100%" }}
        styleInput={{ height: "100%" }}
        multiline={true}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    position: "relative",
  },

  topTitle: {
    position: "absolute",
    top: -9,
    left: 10,
    fontSize: 12,
    zIndex: 5,
    backgroundColor: "#fff",
    color: "#666666",
  },
});
