import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";

import { colors } from "../config";
import RInputBasic from "./rInputBasic";
import { useMemo } from "react";

export default function RInput({
  isSuccess = false,
  isValid = true,
  isLoading = false,
  color = "white",
  shadow = true,
  style = {},
  containerStyle = {},
  defaultValue,
  enterKeyHint,
  returnKeyType,
  mask = "no-mask",
  containerBgStyle,
  ...props
}) {
  const sBackground = useMemo(() => {
    let borderColorValue = "transparent";

    if (isSuccess) {
      borderColorValue = colors["green-dark"];
    }

    if (!isValid) {
      borderColorValue = "#FAD1D1";
    }

    let styles = {
      borderColor: borderColorValue,
      backgroundColor: isValid ? colors[color] : "#F8ECEC",
      borderRadius: 10,
      borderWidth: 1,
    };

    if (shadow) {
      styles = {
        ...styles,
        shadowColor: "#6F7882",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2,
      };
    }

    return styles;
  }, [isSuccess, isValid]);

  const sInput = { ...styles.input, fontSize: 16, ...style };

  const sContainer = shadow
    ? { ...styles.container, ...containerStyle }
    : containerStyle;

  const sBgStyle = {
    ...sBackground,
    ...containerBgStyle,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={sContainer}>
        <View style={sBgStyle}>
          <View style={styles.row}>
            <RInputBasic
              mask={mask}
              style={sInput}
              enterKeyHint={enterKeyHint}
              returnKeyType={returnKeyType}
              {...props}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? 9 : 14,
    paddingBottom: Platform.OS === "android" ? 9 : 14,
  },
  container: {},
});
