import { useId } from "react";

import CodeInput from "react-native-code-input";

import {
  DynamicColorIOS,
  InputAccessoryView,
  StyleSheet,
  Keyboard,
  Button,
  View,
  Dimensions,
  Platform,
} from "react-native";

const { width } = Dimensions.get("window");

export default function RInputCode({ ...props }) {
  const inputAccessoryViewID = useId();

  let dynamicToolbarColor = "#d2d5db";

  if (Platform.OS === "ios") {
    dynamicToolbarColor = DynamicColorIOS({
      dark: "#252525",
      light: "#f8f8f8",
    });
  }

  return (
    <>
      <CodeInput inputAccessoryViewID={inputAccessoryViewID} {...props} />
      {Platform.OS === "ios" && (
        <InputAccessoryView
          backgroundColor={dynamicToolbarColor}
          nativeID={inputAccessoryViewID}
        >
          <View style={{ ...styles.extraButton, width: width }}>
            <Button onPress={() => Keyboard.dismiss()} title="Скрыть" />
          </View>
        </InputAccessoryView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  extraButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 42,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#AAAAAAFF",
  },
});
