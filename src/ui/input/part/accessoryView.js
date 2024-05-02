import {
  DynamicColorIOS,
  useWindowDimensions,
  Keyboard,
  View,
  Button,
  StyleSheet,
  InputAccessoryView,
  Platform,
} from "react-native";

const getDynamicToolbarColor = () => {
  let dynamicToolbarColor = "#d2d5db";

  if (Platform.OS === "ios") {
    dynamicToolbarColor = DynamicColorIOS({
      dark: "#252525",
      light: "#f8f8f8",
    });
  }

  return dynamicToolbarColor;
};

export default function AccessoryView({ inputAccessoryViewID }) {
  const { width } = useWindowDimensions();

  const dynamicToolbarColor = getDynamicToolbarColor();

  if(Platform.OS !== "ios") {
    return <></>
  }

  return (
    <InputAccessoryView
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "100%",
      }}
      backgroundColor={dynamicToolbarColor}
      nativeID={inputAccessoryViewID}
    >
      <View style={{ ...styles.extraButton, width: width }}>
        <Button onPress={() => Keyboard.dismiss()} title="Скрыть" />
      </View>
    </InputAccessoryView>
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
