import {
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";

import Paragraph from "../text/paragraph";

import { colors } from "../config";
import { useEffect, useRef, useState } from "react";
import InputSide from "../dropdown/part/inputSide";

export default function RInputCheckbox({
  isRequired = true,
  isValid = true,
  isLoading = false,
  leftWidth = 80,
  left = null,
  rightWidth = 80,
  right = null,
  color = "white",
  shadow = true,
  style = {},
  containerStyle = {},
  defaultValue,
  enterKeyHint,
  returnKeyType,
  placeholder,
  onValueChange,
  initialValue,
  name,
  placeholderColor = "grey-medium",
  placeholderSize = "md",
  placeholderStyle,
  ...props
}) {
  const sBackground = {
    shadowColor: "#6F7882",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: isValid ? colors[color] : "#F8ECEC",
  };
  const sInput = { ...styles.input, ...style, fontSize: 16 };

  const sContainer = shadow
    ? { ...styles.container, ...containerStyle }
    : {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: isValid ? "transparent" : "#FAD1D1",
        overflow: "hidden",
        ...containerStyle,
      };
  const [isEnabled, setIsEnabled] = useState(initialValue == 0 ? true : false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);

    if (onValueChange) {
      onValueChange({ name: name, value: isEnabled ? "1" : "0" });
    }
  };

  useEffect(() => {
    if (onValueChange) {
      onValueChange({ name: name, value: initialValue == 0 ? "0" : "1" });
    }
  }, []);

  const checkboxHeight = useRef(null);
  const switchHeight = useRef(null);

  const getTopPosition = () => {
    if (checkboxHeight.current && switchHeight.current) {
      return checkboxHeight.current / 2 - switchHeight.current / 2;
    }

    return null;
  };

  return (
    <TouchableOpacity
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;

        checkboxHeight.current = height;
      }}
      onPress={() => toggleSwitch()}
    >
      <View style={sContainer}>
        <View
          style={{
            ...sBackground,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isValid ? "transparent" : "#FAD1D1",
            position: "relative",
          }}
        >
          <View style={styles.row}>
            {/* {isRequired && (
              <Paragraph size="md" color="red">
                *
              </Paragraph>
            )} */}

            <InputSide variant="left" side={left} width={leftWidth} />

            <View
              onPress={(ev) => ev.preventDefault}
              style={sInput}
              enterKeyHint={enterKeyHint}
              returnKeyType={returnKeyType}
              {...props}
            >
              <Paragraph
                style={placeholderStyle}
                color={isEnabled ? "black" : placeholderColor}
                size={placeholderSize}
              >
                {placeholder}
              </Paragraph>

              <Switch
                onLayout={(event) => {
                  const { x, y, width, height } = event.nativeEvent.layout;

                  switchHeight.current = height;
                }}
                style={{ ...styles.switch, top: getTopPosition() }}
                thumbStyle={{
                  height: 1,
                }}
                trackColor={{
                  false: colors["grey-light"],
                  true: colors["green-dark"],
                }}
                thumbColor={isEnabled ? colors["white"] : colors["white"]}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <InputSide variant="right" side={right} width={rightWidth} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
  },
  container: {
    // shadowColor: "#6F7882",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 2, // для Android
  },
  switch:
    Platform.OS === "ios"
      ? {
          transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
          shadowColor: "rgba(111, 120, 130, 0.35)",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 6,
          margin: 0,
          padding: 0,
          position: "absolute",
          right: -8,
        }
      : {
          shadowColor: "rgba(111, 120, 130, 0.35)",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 6,
          margin: 0,
          padding: 0,
          position: "absolute",
          right: -8,
        },
});
